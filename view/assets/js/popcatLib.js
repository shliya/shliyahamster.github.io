$(document).ready(function () {
    "use strict";
    let meownusDiv = $("#meownus_div");
    let meownus = $("#meownus");
    let meownusPop = $("#meownus_pop")
    let pop_count = 0;
    let showCount = $("#counter")
    let sound_video = new Audio("");
    const playSound = () => {
        
    }
    const popMethod = () => {
        // playSound();
        meownus.attr("style","visibility: hidden;")
        meownusPop.attr("style","visibility: unset;")
    }
    const downMethod = () => {
        meownusPop.attr("style","visibility: hidden;")
        meownus.attr("style","visibility: unset;")
    }
    const addCount = ()=>{
        pop_count++;
        window.localStorage.setItem("pop_count",pop_count)
        showCount.html(Number(pop_count));
    }
    const storageGet = ()=>{
        let count = window.localStorage.getItem("pop_count")
        showCount.html(Number(count));
    }
    storageGet();

    meownusDiv.on("mousedown",function (){
        addCount();
        popMethod();
    })
    meownusDiv.on("mouseout",function (){
        downMethod();
    })
});
