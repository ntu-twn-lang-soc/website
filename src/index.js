import Mustache from "mustache";
import CryptoJS from "crypto-es";
import { fetch } from "whatwg-fetch";
import { getDetails, getRole } from "./questionsUtils";
import { registerEventListener } from "./eventListeners";

const urlParams = new URLSearchParams(window.location.search);
const SVID = urlParams.get("svid");
const HASH = urlParams.get("hash");

// ?svid=ND12k&hash=10ce118b9e681040775d67d7a2748f46

const key = "60a77699fb3f5040";
const iv = "3de6a3000e65827d";

let svcontent;
let questions = [];
let score = [0, 0]; //[本土語言, 行動傾向]
let role;

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
			if (quiz.answer.length != 0) {
				questions.push({
					subject: quiz.subject,
					answer: quiz.answer,
					detail: getDetails(quiz.sn),
				});

				let resScore = quiz.answerLabel[0].split(",").map((ele) => {return parseInt(ele)});

				for (let i = 0; i < score.length; i++) {
					score[i] = score[i] + resScore[i]
				};
			}
		});

		renderTemplate();
	});

let renderTemplate = () => {
	let main = document.getElementById("main");
	let rendered = Mustache.render(main.innerHTML, {
		questions: questions,
		role: getRole(score),
		score: {
			lang: score[0],
			action: score[1]
		}
	});
	main.innerHTML = rendered;
	registerEventListener();
};
