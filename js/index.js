const shortenForm = document.querySelector(".shorten-form");
const shortenUrl = document.querySelector(".short-url");
const errorMsg = document.querySelector(".error-msg");
const copyUrl = document.querySelector(".copy-url");
const output = document.querySelector(".output");

// fucntion to validate URl
function checkURl(url) {
	try {
		new URL(url);
		errorMsg.style.display = "none";
		return true;
	} catch (error) {
		errorMsg.style.display = "block";
		return false;
	}
}

shortenForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const longUrl = document.getElementById("long-url");
	const checkUrl = checkURl(longUrl.value);
	if (!checkUrl) return;

	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			apikey: "04bfd4d1e0814e3b873e1383da2390a8",
		},
		body: JSON.stringify({ destination: longUrl.value }),
	};

	fetch("https://api.rebrandly.com/v1/links", options)
		.then((response) => response.json())
		.then((response) => {
			shortenUrl.innerHTML = response.shortUrl;
			copyUrl.disabled = false;
			output.style.opacity = "1";
		})
		.catch((err) => console.error(err));
});

copyUrl.addEventListener("click", function () {
	simplecopy(shortenUrl.innerHTML);
	copyUrl.innerHTML = "Copied!";
	copyUrl.disabled = true;
});
