window.onload = animateText();
var id = null;
var textToDisplay = "Working in progress...";

function animateText() 
{
	var mainText = document.getElementById("main_text");
	var textIterator = 0;
	clearInterval(id);
	id = setInterval(frame, 200);
	
	function frame() 
	{
		if (textIterator != textToDisplay.length)
		{
			textIterator++;
			mainText.innerText = textToDisplay.substring(0, textIterator);
			mainText.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
			mainText.style.fontSize = (Math.floor(Math.random() * 2) + 52) + "px";

		}
		else textIterator = 0;
	}
}