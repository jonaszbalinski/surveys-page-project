window.onload = animateText();
var id = null;
var textToDisplay = "...working_in_progress.......";

function animateText() 
{
	var mainText = document.getElementById("main_text");
	var textIterator = 0;
	clearInterval(id);
	id = setInterval(frame, 100);
	
	function frame() 
	{
		if (textIterator != textToDisplay.length)
		{
			textIterator++;
			mainText.innerText = "";
			for (var i = 0; i < textIterator; i++)
			{
				mainText.innerText += textToDisplay[i];
				mainText.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
				mainText.style.fontSize = (Math.floor(Math.random() * 2) + 26) + "px";
			}
		}
		else textIterator = 0;
	}
}