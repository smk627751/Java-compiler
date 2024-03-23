let editor = document.querySelector('.editor')
let reset = document.querySelector('.reset')
let run = document.querySelector('.run')
let monitor = document.querySelector('.monitor')
let btn = document.querySelector('.switch')
let input = document.querySelector('.inputfield')
let display = document.querySelector('.display')
let boilerPlate = `public class Main {
	public static void main(String[] args) {
		System.out.print("Hello world");

	}

}`
editor.value = boilerPlate

const toggle = () => {
    btn.innerText = (btn.innerText == '>' ? '<' : '>')
    input.classList.toggle('active')
    display.classList.toggle('active')
}

let loader = document.createElement('div')
loader.className = 'loader'

const makeRequest = async () => {
    input.classList.remove('active')
    display.classList.remove('active')
    display.value = ""
    monitor.appendChild(loader)
    const response = await fetch('/Compiler/Java',{
        method:'POST',
        body:JSON.stringify({code: editor.value,input:input.value})
    })
    const data = await response.json()
    console.log(data)
    monitor.removeChild(loader)
    if(data.compilationError != null)
    {
        display.style.color = '#f50a0a'
        display.value = data.compilationError+`\nProcess finished with exit code ${data.exitCode}`
    }
    else if(data.error != null)
    {
        display.style.color = '#f50a0a'
        display.value = data.error
    }
    else if(data.output != null)
    {
        display.value = data.output
        display.style.color = '#fff'
        display.value += `\nProcess finished with exit code ${data.exitCode}`
    }
}

btn.addEventListener('click',toggle)

reset.addEventListener('click',() => {
    confirm('Are you sure want to reset?') && (editor.value = boilerPlate) && (display.value = "")
})

run.addEventListener('click',makeRequest)

// editor.addEventListener('input',updateLineNumbers)

// function updateLineNumbers() {
//     var lineNumbersDiv = document.getElementById("lineNumbers");
//     var lines = editor.value.split("\n");
//     var lineNumbersHTML = "";

//     for (var i = 1; i <= lines.length; i++) {
//         lineNumbersHTML += i + "<br>";
//     }

//     lineNumbersDiv.innerHTML = lineNumbersHTML;
// }

// updateLineNumbers();