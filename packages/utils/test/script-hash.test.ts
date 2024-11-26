import { assert, test } from "vitest";
import { validatorToScriptHash } from "../src/scripts";
import { applyDoubleCborEncoding } from "../src/cbor";
const staking =
  "5922d301000022323232325333573466e1ccccc8c8c8c0088cc0080080048c0088cc00800800488894ccd55cf8010a999ab9a3574600220062c2a666aae7c004584ccc010ccc01400cd5d08011aba1001357440046ae88004888c8c8c8c94ccd5cd1991199ab9a0020014a06644666ae6800800528192999ab9a001100113357389201124e6f7420612073637269707420696e707574000013232333573400294128991919192999ab9a3370e90010010a5014a26aae78008d55ce8009baa00135742646aae78dd50008009aba100432533357340022002266ae712401194f66666572206e6f742073656e7420746f2063726561746f72000013375e6ae84008c8d5d0991aab9e375400200264646464646464a666ae68cdc3a400400426644646600240022c664664446646460044660040040024600446600400400244a666aae7c004489400454ccd5cd19baf35573a6ae840040104c014d5d0800898011aba200100123222300200335573c0026ea4004008004dd71aba100137566ae84d5d11aba200f15333573466e1d20040021357420022a66ae712410f4e6f206f757470757420646174756d001635573c0046aae74004dd51aba13574400ea666ae68cdc3a4000004264646464646464646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400c64a666ae68cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba20012300337566aae780040048cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba200123003375a6aae780040048cdc42400000200200220022a66ae712401184e6567617469766520616d6f756e7420696e2056616c7565001637560086466646460044660040040024600446600400400244a666aae7c004480104c894ccd5cd18008010a99ab9c4910c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d357420020024940dd58019991919180111980100100091801119801001000912999aab9f00114bd6f7b630099aba030033574200260046ae880048cdd819192999ab9a53323357340022944cdc3800a4000266e1c0052038135573a0062a66ae71241387074727946726f6d2843757272656e637953796d626f6c293a206d757374206265203238206279746573206c6f6e67206f7220656d7074790016371a0026eb8d55ce8009919191aab9e004323332323002233002002001230022330020020012253335573e002240082644a666ae68c00400854cd5ce24810c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d357420020024940dd59aab9e00333232323002233002002001230022330020020012253335573e002297adef6c60133574060066ae84004c008d5d1000919bb0325333573466e24dc6800a408026aae7400854cd5ce2481327074727946726f6d28546f6b656e4e616d65293a206d757374206265206174206d6f7374203332204279746573206c6f6e670016375c6aae74004c8d55cf0011bad35573c0020026eacd55cf0008009bab001357420026ae880194ccd5cd19b87480000084c8c8c8c8c8c8c8c8c8c8c8c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a4000004264646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a4000004264646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a400000426464a666ae68cdc39b8d001480e04c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d28505075624b657948617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454ccd5cd19b87480080084c8c94ccd5cd19b87371a002901c0991924ca666aae7c00452615335738921317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d285053637269707448617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454cd5ce24813f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba100115333573466e1d20020021323232323232323232324994ccd55cf8008a4c2a66ae712401317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440066eb4004d5d08009aba2003375a0026ae84004d5d10019bad001357420022a66ae712413f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba100115333573466e1d20020021324994ccd55cf8008a4c2a66ae712401317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00161533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10013574400ca666ae68cdc3a400000426464a666ae68cdc39b8d001480e04c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d28505075624b657948617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454ccd5cd19b87480080084c8c94ccd5cd19b87371a002901c0991924ca666aae7c00452615335738921317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d285053637269707448617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454cd5ce24813f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10011533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10011533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd51919192999ab9a3370e90000010a99ab9c4910f4e6f206f757470757420646174756d001615333573466e1d200400213574200226644646600240022c664664446646460044660040040024600446600400400244a666aae7c004489400454ccd5cd19baf35573a6ae840040104c014d5d0800898011aba200100123222300200335573c0026ea4004008004dd71aba100137566ae84d5d11aba200b35573c0046aae74004dd51aba13574400664a666ae6800440044cd5ce24811e4f666665722076616c7565206c657373207468616e206578706563746564000013333222233323230022330020020012300223300200200122253335573e0042664646460044660040040024600446600400400244a666aae7c0045288a9991199ab9a00200114a060066ae840044c008d5d10009198040039bab35573c002002264a666aae7c00854cc88ccd5cd0010008a5033008001007133232323002233002002001230022330020020012253335573e002294454cc88ccd5cd0010008a50300335742002260046ae880048cc024dd59aab9e001008357440062646464a666ae68cdc78010008a9991199ab9a00200114a06601600800626600e6ae88018d5d10028a999ab9a337200040022a6644666ae68008004528198058020050998039aba200600515332233357340040022940cc02c02800c4cc01c018d5d10029bae35573a6ae84010dd71aab9d357420086eacd55cf1aba100237566aae78d5d080100100099111999191801119801001000918011198010010009112999aab9f002133232323002233002002001230022330020020012253335573e002294454cc88ccd5cd0010008a50300335742002260046ae880048cdc48039bad35573c002002264a666aae7c00854cc88ccd5cd0010008a503371200200e2664646460044660040040024600446600400400244a666aae7c0045288a9991199ab9a00200114a060066ae840044c008d5d1000919b89375a6aae78004020d5d100189919192999ab9a3371e0040022a6644666ae6800800452819b890040031330073574400c6ae8801454ccd5cd19b9000200115332233357340040022940cdc48020050998039aba200600515332233357340040022940cdc48050018998038031aba2005375c6aae74d5d08021bae35573a6ae84010dd69aab9e357420046eb4d55cf1aba1002002001480012f5bded8c0646eacd5d09aba23235573c6ea8004004c8c8c8c8c8c8c94ccd5cd19b87480080084cc88c8cc004800458cc8cc888cc8c8c0088cc0080080048c0088cc008008004894ccd55cf80089128008a999ab9a3375e6aae74d5d0800802098029aba100113002357440020024644460040066aae78004dd48008010009bae357420026eacd5d09aba23574401e2a666ae68cdc3a400800426ae8400454cd5ce24810f4e6f206f757470757420646174756d001635573c0046aae74004dd51aba13574400ea666ae68cdc3a4000004264646464646464646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400c64a666ae68cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba20012300337566aae780040048cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba200123003375a6aae780040048cdc42400000200200220022a66ae712401184e6567617469766520616d6f756e7420696e2056616c7565001637560086466646460044660040040024600446600400400244a666aae7c004480104c894ccd5cd18008010a99ab9c4910c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d357420020024940dd58019991919180111980100100091801119801001000912999aab9f00114bd6f7b630099aba030033574200260046ae880048cdd819192999ab9a53323357340022944cdc3800a4000266e1c0052038135573a0062a66ae71241387074727946726f6d2843757272656e637953796d626f6c293a206d757374206265203238206279746573206c6f6e67206f7220656d7074790016371a0026eb8d55ce8009919191aab9e004323332323002233002002001230022330020020012253335573e002240082644a666ae68c00400854cd5ce24810c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d357420020024940dd59aab9e00333232323002233002002001230022330020020012253335573e002297adef6c60133574060066ae84004c008d5d1000919bb0325333573466e24dc6800a408026aae7400854cd5ce2481327074727946726f6d28546f6b656e4e616d65293a206d757374206265206174206d6f7374203332204279746573206c6f6e670016375c6aae74004c8d55cf0011bad35573c0020026eacd55cf0008009bab001357420026ae880194ccd5cd19b87480000084c8c8c8c8c8c8c8c8c8c8c8c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a4000004264646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a4000004264646464646464932999aab9f001149854cd5ce2481317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00163574400ca666ae68cdc3a400000426464a666ae68cdc39b8d001480e04c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d28505075624b657948617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454ccd5cd19b87480080084c8c94ccd5cd19b87371a002901c0991924ca666aae7c00452615335738921317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d285053637269707448617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454cd5ce24813f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba100115333573466e1d20020021323232323232323232324994ccd55cf8008a4c2a66ae712401317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440066eb4004d5d08009aba2003375a0026ae84004d5d10019bad001357420022a66ae712413f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba100115333573466e1d20020021324994ccd55cf8008a4c2a66ae712401317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f00161533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10013574400ca666ae68cdc3a400000426464a666ae68cdc39b8d001480e04c8c92653335573e0022930a99ab9c491317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d28505075624b657948617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454ccd5cd19b87480080084c8c94ccd5cd19b87371a002901c0991924ca666aae7c00452615335738921317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f0016357440062a66ae7124012c7074727946726f6d285053637269707448617368293a206d757374206265203238206279746573206c6f6e670016375c0026ae8400454cd5ce24813f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10011533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd50009aba10011533573892013f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd51919192999ab9a3370e90000010a99ab9c4910f4e6f206f757470757420646174756d001615333573466e1d200400213574200226644646600240022c664664446646460044660040040024600446600400400244a666aae7c004489400454ccd5cd19baf35573a6ae840040104c014d5d0800898011aba200100123222300200335573c0026ea4004008004dd71aba100137566ae84d5d11aba200b35573c0046aae74004dd51aba13574400664a666ae68cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba20012300337566aae780040048cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a5115332233357340040022940c00cd5d0800898011aba200123003375a6aae780040048cdc42400000200200220022a66ae71241184e6567617469766520616d6f756e7420696e2056616c7565001632533357346644664646460044660040040024600446600400400244a666aae7c0045280a99919ab9a00114a260066ae840044c008d5d1000918019bab35573c0020024a66466ae680045289aba3323332323002233002002001230022330020020012253335573e002240082644a666ae68c00400854cd5ce24810c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d3574200200249400044cc88cc8c8c8c0088cc0080080048c0088cc008008004894ccd55cf8008a50153323357340022944c00cd5d0800898011aba200123003375a6aae780040048cdc3800a40000020022a66ae712410e41626e6f726d616c2056616c756500161323332323002233002002001230022330020020012253335573e002240082644a666ae68c00400854cd5ce2490c756e736f72746564206d6170001613300435744006466e4000400cdd71aab9d357420020024940004dd59aba100113370000e90010b1aba20013235573c6ea800400cd5d1000991aab9e37540020049000199919191801119801001000918011198010010009112999aab9f00114bd700a999ab9a3371066e18008cdc1240086644a666ae68cdc3800a40002900109999191801119801001000918011198010010009112999ab9a3370e002900108010992999ab9a323370e66e1400520044800000840044cdc10018009980199b82002002337060029002001000a40086eb4d5d080099b86337000046644a666ae68cdc3800a40002900109999191801119801001000918011198010010009112999ab9a3370e002900108010992999ab9a323370e66e1400520044800000840044cdc10018009980199b82002002337060029002001000a40086eb4d5d080099b8248010cc894ccd5cd19b87001480005200213332323002233002002001230022330020020012225333573466e1c00520021002132533357346466e1ccdc2800a400890000010800899b82003001330033370400400466e0c005200400200148010dd69aba1001133574060086eb4d5d08009980199b8000233225333573466e1c00520001480084ccc8c8c0088cc0080080048c0088cc0080080048894ccd5cd19b870014800840084c94ccd5cd1919b873370a0029002240000042002266e0800c004cc00ccdc100100119b83001480100080052004375a6ae84004d5d10008a99ab9c491186475706c696361746520696e6465782064657465637465640016232357426ae88c8d55cf1baa00100133225333573466e2000920001533573892011770656c656d41743a206e6567617469766520696e6465780016133225333573466e1c009200013574200226646646444a666ae68cdc38012400026ae840044cc00ccdc0801240046ae880048cc0080080048c8894ccd5cd19b87002480004d5d080089980199b8100248008d5d100091980100100080099b8100248008d5d10008010008009bac3574200890001bac3574200866646464600446600400400246004466004004002444a666aae7c00452f5c02a666ae68cdc419b8600233704900219912999ab9a3370e00290000a40042666464600446600400400246004466004004002444a666ae68cdc3800a40042004264a666ae68c8cdc399b8500148011200000210011337040060026600666e08008008cdc1800a400800400290021bad3574200266e18cdc000119912999ab9a3370e00290000a40042666464600446600400400246004466004004002444a666ae68cdc3800a40042004264a666ae68c8cdc399b8500148011200000210011337040060026600666e08008008cdc1800a400800400290021bad3574200266e09200433225333573466e1c00520001480084ccc8c8c0088cc0080080048c0088cc0080080048894ccd5cd19b870014800840084c94ccd5cd1919b873370a0029002240000042002266e0800c004cc00ccdc100100119b83001480100080052004375a6ae840044cd5d018021bad357420026600666e00008cc894ccd5cd19b87001480005200213332323002233002002001230022330020020012225333573466e1c00520021002132533357346466e1ccdc2800a400890000010800899b82003001330033370400400466e0c005200400200148010dd69aba1001357440022a66ae712401186475706c696361746520696e6465782064657465637465640016233225333573466e200092000153357389211770656c656d41743a206e6567617469766520696e6465780016133225333573466e1c009200013574200226646646444a666ae68cdc38012400026ae840044cc00ccdc0801240046ae880048cc0080080048c8894ccd5cd19b87002480004d5d080089980199b8100248008d5d100091980100100080099b8100248008d5d10008010008009bac3574200690001bac357426ae88010ccc8c8c0088cc0080080048c0088cc0080080048894ccd55cf800880109919192999ab9a3370e900100109980319b8000548008d5d10020998030029aba200435573c0046aae74004dd5191aba13235573c6ea8004004c8d5d0991aab9e3754002002646ae84d5d1191aab9e37540020026ae84005200037586ae8400c5261632357446ae88d5d11aba2357440026ae88004d5d11aba20013235573c6ea8004d5d0991aab9e3754002004646aae78dd5000991919190032999ab9a3370e900000109919191919191924ca666aae7c00452615335738921317074727946726f6d2850446174615265636f72645b5d293a206c697374206973206c6f6e676572207468616e207a65726f001635744006664646460044660040040024600446600400400244a666aae7c00452f5c0266ae80c00cd5d080098011aba2001232002375a0026eb0004d5d08009aba200333232323002233002002001230022330020020012253335573e002297ae0133574060066ae84004c008d5d10009190011bad00137580026ae8400454cd5ce24813f7265616368656420656e64206f662073756d207768696c65207374696c6c206e6f7420686176696e6720666f756e642074686520636f6e7374727563746f72001635573c0046aae74004dd500101";

test("Double CBOR Encoding Test", () => {
  assert.strictEqual(
    "fb81f41e4bb6edf141c1263d01af227e0f334febe68dbcbbc465a393",
    validatorToScriptHash({
      type: "PlutusV2",
      script: staking,
    }),
  );
});
test("Single CBOR Encoding Test", () => {
  assert.strictEqual(
    "95725140beeec2d8e33570197fd33df021c283b537ded58515cc5e02",
    validatorToScriptHash({
      type: "PlutusV2",
      script: applyDoubleCborEncoding(staking),
    }),
  );
});