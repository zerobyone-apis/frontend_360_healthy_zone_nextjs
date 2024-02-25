import CryptoJS from "crypto-js";

export class Crypto {
	public static encrypt = (text: string) => {
		const key = CryptoJS.enc.Hex.parse(process.env.SECRET || "");
		const iv = CryptoJS.enc.Hex.parse(process.env.SECRET || "");

		return CryptoJS.AES.encrypt(text, key, { iv }).toString();
	};

	public static decrypt = (text: string) => {
		const key = CryptoJS.enc.Hex.parse(process.env.SECRET || "");
		const iv = CryptoJS.enc.Hex.parse(process.env.SECRET || "");

		return CryptoJS.AES.decrypt(text, key, { iv }).toString(CryptoJS.enc.Utf8);
	};
}
