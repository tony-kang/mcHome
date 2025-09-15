<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

    let {
        text = 'Around The World',
        fontSize = '7em',
        fontFamily = 'Montserrat',
        className = ''
    } = $props();

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        gsap.to('.text0', {
            x: '20%',
            rotate: 10,
            duration: 0.85,
            scrollTrigger: {
                trigger: '.text0',
                scrub: true,
                start: 'top 20%'
            }
        });

        gsap.to('.text2', {
            x: '20%',
            rotate: 10,
            duration: 0.85,
            scrollTrigger: {
                trigger: '.text2',
                scrub: true,
                start: 'top 40%'
            }
        });

        gsap.to('.text1', {
            x: '-20%',
            rotate: -10,
            duration: 0.85,
            scrollTrigger: {
                trigger: '.text1',
                scrub: true,
                start: 'top 30%'
            }
        });

        gsap.to('.text3', {
            x: '-20%',
            rotate: -10,
            duration: 0.85,
            scrollTrigger: {
                trigger: '.text3',
                scrub: true,
                start: 'top 40%'
            }
        });
    });
</script>

<div class="container">
    <div id="text" class="text0">{text}</div>
    <div id="text" class="text1">{text}</div>
    <div id="text" class="text2">{text}</div>
    <div id="text" class="text3">{text}</div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

    .container {
        font-family: v-bind(fontFamily);
        background: ivory;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
    }

    #text {
        text-align: center;
        position: relative;
        top: 200px;
        font-size: v-bind(fontSize);
    }

    .text0, .text2 {
        color: black;
        -webkit-text-fill-color: white;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }

    .text1, .text3 {
        color: black;
        -webkit-text-fill-color: #bc0000;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }

    #dummy {
        position: relative;
        height: 100vh;
        width: 100%;
    }

    #back {
        position: relative;
        padding-top: 50%;
        text-align: center;
        font-size: 1.5em;
        cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
        #back {
            cursor: none;
            font-size: 0.8em;
        }
        #text {
            top: 70px;
            font-size: 2.25em;
        }
    }
</style> 