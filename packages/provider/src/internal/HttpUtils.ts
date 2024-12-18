import {
  HttpClient,
  HttpClientError,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Effect, identity, pipe, Schema } from "effect";

export const filterStatusOk = (
  self: HttpClientResponse.HttpClientResponse,
): Effect.Effect<
  HttpClientResponse.HttpClientResponse,
  HttpClientError.ResponseError
> =>
  self.status >= 200 && self.status < 300
    ? Effect.succeed(self)
    : self.text.pipe(
        Effect.flatMap((text) =>
          Effect.fail(
            new HttpClientError.ResponseError({
              response: self,
              request: self.request,
              reason: "StatusCode",
              description: `non 2xx status code : ${text}`,
            }),
          ),
        ),
      );

export const makeGet = <A, I>(
  url: string | URL,
  schema: Schema.Schema<A, I, never>,
  headers: Record<string, string> | undefined,
) =>
  pipe(
    // Initiate a GET request to the specified URL
    HttpClientRequest.get(url),
    // Conditional bearer token authentication
    headers ? HttpClientRequest.setHeaders(headers) : identity,
    // Execute the HTTP request and retrieve the response
    HttpClient.execute,
    // Ensure only 2xx responses are treated as successes.
    Effect.flatMap(filterStatusOk),
    // Parse the response body using the provided JSON schema
    // This validates and transforms the response to the expected type
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
    // Ensure request is aborted if the program is interrupted
    // Prevents resource leaks and ensures clean request termination
    Effect.scoped,
  );

export const makePostAsJson = <A, I, R>(
  url: string | URL,
  data: unknown,
  schema: Schema.Schema<A, I, R>,
  headers: Record<string, string> | undefined,
) =>
  pipe(
    // Initiate a POST request to the specified URL
    HttpClientRequest.post(url),
    // Conditional headers
    headers ? HttpClientRequest.setHeaders(headers) : identity,
    // Set the request body as Json
    HttpClientRequest.bodyJson(data),
    // Execute the HTTP request and retrieve the response
    Effect.flatMap(HttpClient.execute),
    // Ensure only 2xx responses are treated as successes.
    Effect.flatMap(filterStatusOk),
    // Parse the response body using the provided JSON schema
    // This validates and transforms the response to the expected type
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
    // Ensure request is aborted if the program is interrupted
    // Prevents resource leaks and ensures clean request termination
    Effect.scoped,
  );

export const makePostAsUint8Array = <A, I, R>(
  url: string | URL,
  data: Uint8Array,
  schema: Schema.Schema<A, I, R>,
  headers: Record<string, string> | undefined,
) =>
  pipe(
    // Initiate a POST request to the specified URL
    HttpClientRequest.post(url),
    // Conditional bearer token authentication
    headers ? HttpClientRequest.setHeaders(headers) : identity,
    // Set the request body as a Uint8Array with CBOR content type
    HttpClientRequest.bodyUint8Array(data, "application/cbor"),
    // Execute the HTTP request and retrieve the response
    HttpClient.execute,
    // Ensure only 2xx responses are treated as successes.
    Effect.flatMap(filterStatusOk),
    // Parse the response body using the provided JSON schema
    // This validates and transforms the response to the expected type
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
    // Ensure request is aborted if the program is interrupted
    // Prevents resource leaks and ensures clean request termination
    Effect.scoped,
  );
