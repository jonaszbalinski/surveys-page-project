window.onload = animateText();
window.onload = document.getElementById("menu_button").addEventListener("click",menuHide);
window.onload = document.getElementById("user_button").addEventListener("click",userHide);

var id = null;
var textToDisplay = "Working in progress...";
var menuVisible = false;
var userVisible = false;
		
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
			mainText.style.fontSize = (Math.floor(Math.random() * 5) + 98) + "px";

		}
		else textIterator = 0;
	}
}

function menuHide()
{
		var menuBox = document.getElementById("menu_box");

		if(menuVisible)
		{
			menuBox.style.visibility = "hidden";
			menuVisible = false;
			
			
		}
		else
		{
			menuBox.style.visibility = "visible";
			menuVisible = true
			
		}
}

function userHide()
{
		var userBox = document.getElementById("user_box");

		if(userVisible)
		{
			userBox.style.visibility = "hidden";
			userVisible = false;
			
			
		}
		else
		{
			userBox.style.visibility = "visible";
			userVisible = true
			
		}
}

const validateLogin = () => {
	alert('!');
  }