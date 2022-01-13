import React from 'react'
import Dialogue from './Dialogue'
function Body() {
    //wish I was able to make this a component but it breaks due to append needing vision of the mainbox
    const container = document.querySelector('.mainBox')

    var speeds = {
        pause: 500, //Higher number = longer delay
        slow: 120,
        normal: 90,
        fast: 40,
        superFast: 10
    };

    var textLines = [
        { speed: speeds.slow, string: "Oh, hello!" },
        { speed: speeds.pause, string: "", pause: true },
        { speed: speeds.normal, string: "Have you seen my pet" },
        { speed: speeds.fast, string: "frog", classes: ["green"] },
        { speed: speeds.normal, string: "around?" }
    ];
    console.log("can log")

    var characters = [];
    textLines.forEach((line, index) => {
        if (index < textLines.length - 1) {
            line.string += " "; //Add a space between lines
        }

        line.string.split("").forEach((character) => {
            var span = document.createElement("span");
            span.textContent = character;
            const appendTime = new Promise((resolve, reject) => {
                if (container = null) {
                    resolve(
                        setTimeout(() => {
                            container.appendChild(span);
                            console.log('child appened?')
                        }, 300))
                }
            });
            appendTime.then(() => container.appendChild(span))
            appendTime.finally(() => console.log('promise executed'))
            container.appendChild(span);
            characters.push({
                span: span,
                isSpace: character === " " && !line.pause,
                delayAfter: line.speed,
                classes: line.classes || []
            });
        });
    });

    function revealOneCharacter(list) {
        var next = list.splice(0, 1)[0];
        next.span.classList.add("revealed");
        next.classes.forEach((c) => {
            next.span.classList.add(c);
        });
        var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

        if (list.length > 0) {
            setTimeout(function () {
                revealOneCharacter(list);
            }, delay);
        }
    }

    //Kick it off
    setTimeout(() => {
        revealOneCharacter(characters);
    }, 600)

    return (

        <div className='mainBox'>

            <h3>Choose your own adventure</h3>
        </div>

    )


}


export default Body