import Mustache from "mustache";
import { getDetails } from "./questionsUtils";
import {registerEventListener} from "./eventListeners";

const urlParams = new URLSearchParams(window.location.search);
const SVID = urlParams.get("svid");
const HASH = urlParams.get("hash");

// ?svid=ND12k&hash=10ce118b9e681040775d67d7a2748f46

const key = "60a77699fb3f5040";
const iv = "3de6a3000e65827d";

let svcontent;
let questions = [];

fetch(`https://www.surveycake.com/webhook/v0/${SVID}/${HASH}`)
	.then((res) => res.text())
	.then((res) => {
		const cipherParams = CryptoJS.lib.CipherParams.create({
			ciphertext: CryptoJS.enc.Base64.parse(res),
		});

		const decrypted = CryptoJS.AES.decrypt(
			cipherParams,
			CryptoJS.enc.Utf8.parse(key),
			{
				iv: CryptoJS.enc.Utf8.parse(iv),
			}
		);

		svcontent = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

		svcontent["result"].forEach((quiz) => {
			questions.push({
				subject: quiz.subject,
				answer: quiz.answer,
				detail: getDetails(quiz.sn),
			});
		});

		renderTemplate();
	});

let renderTemplate = () => {
	let main = document.getElementById("main");
	let rendered = Mustache.render(main.innerHTML, {
		questions: questions,
	});
	main.innerHTML = rendered;
	registerEventListener();

};