/**
 * Adds a zoom effect on a selection of images when clicked.
 *
 * @param {(string|Object[])} [selector] The images to apply the zoom to
 * @param {number} [options.margin=0] Space outside the zoomed image
 * @param {string} [options.background="#fff"] The color of the overlay
 * @param {number} [options.scrollOffset=48] Number of pixels to scroll to dismiss the zoom
 * @param {boolean} [options.metaClick=true] Enables the action on meta click
 */
/*jshint esversion: 6 */
/*jslint browser: true*/
(function () {
    'use strict';
    if (navigator.appVersion.indexOf("Win")!=-1) {
        if (!!window.chrome && !!window.chrome.webstore) {
            document.body.classList.add("optimize-render");
        }
    }

    const isMobileDevice = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    const debounce = (func, wait, immediate) => {
        let timeout;
        return () => {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Stores the Y position where the touch started
    var startY = 0;

    // Store enabled status
    var enabled = false;

    var handleTouchmove = function(evt) {
        // Get the element that was scrolled upon
        var el = evt.target;

        // Check all parent elements for scrollability
        while (el !== document.body) {
            // Get some style properties
            var style = window.getComputedStyle(el);

            if (!style) {
                // If we've encountered an element we can't compute the style for, get out
                break;
            }

            var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
            var overflowY = style.getPropertyValue('overflow-y');
            var height = parseInt(style.getPropertyValue('height'), 10);

            // Determine if the element should scroll
            var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
            var canScroll = el.scrollHeight > el.offsetHeight;

            if (isScrollable && canScroll) {
                // Get the current Y position of the touch
                var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;

                // Determine if the user is trying to scroll past the top or bottom
                // In this case, the window will bounce, so we have to prevent scrolling completely
                var isAtTop = (startY <= curY && el.scrollTop === 0);
                var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

                // Stop a bounce bug when at the bottom or top of the scrollable element
                if (isAtTop || isAtBottom) {
                    evt.preventDefault();
                }

                // No need to continue up the DOM, we've done our job
                return;
            }

            // Test the next parent
            el = el.parentNode;
        }

        // Stop the bouncing -- no parents are scrollable
        evt.preventDefault();
    };

    var handleTouchstart = function(evt) {
        // Store the first Y position of the touch
        startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
    };

    var enable = function() {
        // Listen to a couple key touch events
        window.addEventListener('touchstart', handleTouchstart, false);
        window.addEventListener('touchmove', handleTouchmove, false);
        enabled = true;
    };

    var disable = function() {
        // Stop listening
        window.removeEventListener('touchstart', handleTouchstart, false);
        window.removeEventListener('touchmove', handleTouchmove, false);
        enabled = false;
    };

    var isEnabled = function() {
        return enabled;
    };

    if (isMobileDevice()) {
        enable();
    }

    //WEB WORKER CODE, ONLY USE IF SET TIMEOUT NEEDS TO BE LESS THAN 100ms
    /*

    var worker = new Worker('/js/timer-worker.js');

    var workerTimer = {
      id: 0,
      callbacks: {},

      setTimeout: function(cb, timeout, context) {
        this.id++;
        var id = this.id;
        this.callbacks[id] = { fn: cb, context: context };
        worker.postMessage({ command: 'timeout:start', timeout: timeout, id: id });
        return id;
      },

      onMessage: function(e) {
        switch (e.data.message) {
          case 'timeout:tick':
            var callback = this.callbacks[e.data.id];
            if (callback && callback.fn) callback.fn.apply(callback.context);
            break;
          case 'timeout:cleared':
            delete this.callbacks[e.data.id];
            break;
        }
      },

      clearTimeout: function(id) {
        worker.postMessage({ command: 'timeout:clear', id: id });
      }
    };

    worker.onmessage = workerTimer.onMessage.bind(workerTimer);

    workerTimer.setTimeout(function() { });

    */

    // JSON DATA FOR MESSAGES

    const data = {
        1: {
            id: 1,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false, 3, false],
            message: {
                1: {
                    body: ['Hey <strong>Visitor</strong> &#x1f44b; , If your interested...'],
                    delay: 1500,
                    loadingDelay: 1500
                },
                2: {
                    body: ['You can learn a little more about me.'],
                    delay: 1500,
                    loadingDelay: 1500
                },
                3: {
                    body: ['<button class="button__primary button--full-width" data-question="0, 2">Sure, why not</button><button class="button__primary button--full-width" id="showSad" data-question="1, 2">Nah, not really</button>'],
                    delay: 1500,
                    loadingDelay: 1500,
                    resReq: true,
                    sadRes: true
                }
            }
        },
        2: {
            id: 2,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['👍 Sure, tell me a little about yourself.', 'Uhhh, 👎 nah I\'m good thanks though.'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        3: {
            id: 3,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false, 0, true],
            message: {}
        },
        4: {
            id: 4,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['Lay it on me, why do you love designing products?', 'Okay then, where do you think product design is heading?', 'Sure why not, what else floats your boat?'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        5: {
            id: 5,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,0, true],
            forkingRes: true,
            message: {}
        },
        6: {
            id: 6,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,3, false],
            message: {
                1: {
                    body: ['Now...'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                2: {
                    body: ['Quid pro quo <strong>Visitor</strong>, Star Wars or Star Trek.'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                3: {
                    body: ['<button class="button__primary button--full-width" data-question="0, 7" >Star Wars</button><button class="button__primary button--full-width" data-question="1, 7">Star Trek</button>'],
                    delay: 1000,
                    loadingDelay: 1500,
                    resReq: true
                }
            }
        },
        7: {
            id: 7,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['Haha, is this even a question? Star Wars.', 'Common, Star Trek of course.'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        8: {
            id: 8,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,0, true],
            message: {}
        },
        9: {
            id: 9,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,3, false],
            dynRes: true,
            message: {
                1: {
                    body: ['Okay, part deux. 🙌'],
                    delay: 1200,
                    loadingDelay: 1500
                },
                2: {
                    body: ['What do you want to know about next?'],
                    delay: 1200,
                    loadingDelay: 1500
                },
                3: {
                    body: [],
                    delay: 1500,
                    loadingDelay: 1500,
                    resReq: true
                }
            }
        },
        10: {
            id: 10,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['Lay it on me, why do you love designing products?', 'Okay then, where do you think product design is heading?', 'Sure why not, what else (besides design) floats your boat?'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        11: {
            id: 11,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,0, true],
            forkingRes: true,
            message: {}
        },
        12: {
            id: 12,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,3, false],
            message: {
                1: {
                    body: ['Okay now to the important stuff.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                2: {
                    body: ['We all like crime fighting billionaires.'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                3: {
                    body: ['Who is your favorite <strong>Visitor</strong>? Batman or Iron man.'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                4: {
                    body: ['<button class="button__primary button--full-width" data-question="0, 13" >Batman</button><button class="button__primary button--full-width" data-question="1, 13">Iron Man</button>'],
                    delay: 1000,
                    loadingDelay: 1500,
                    resReq: true
                }
            }
        },
        13: {
            id: 13,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['Pretty sure batman\'s the best ever.', 'Iron Man, no one has more style.'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        14: {
            id: 14,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,0, true],
            message: {}
        },
        15: {
            id: 15,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false, 4, false],
            dynRes: true,
            message: {
                1: {
                    body: ['There\'s only one option left.. '],
                    delay: 2000,
                    loadingDelay: 1500
                },
                2: {
                    body: ['However to keep things interesting, I added one more option.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                3: {
                    body: ['You can only choose one, so choose wisely.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                4: {
                    body: [],
                    delay: 1500,
                    loadingDelay: 1500,
                    resReq: true
                }
            }
        },
        16: {
            id: 16,
            name: "Visitor",
            avatar: "img/visitor-logo.png 1x, img/visitor-logo@2x.png 2x",
            metadata: [true, 1, false],
            message: {
                1: {
                    body: ['Lay it on me, why do you love designing products?', 'Okay then, where do you think product design is heading?', 'Sure why not, what else (besides design) floats your boat?', 'MYSTERY BOX! MYSTERY BOX! MYSTERY BOX!'],
                    delay: 0,
                    loadingDelay: 0
                }
            }
        },
        17: {
            id: 17,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false ,0, true],
            forkingRes: true,
            message: {}
        },
        18: {
            id: 18,
            name: "Hayden Tarr",
            avatar: "img/logo.png 1x, img/logo@2x.png 2x",
            metadata: [false, 7, false],
            message: {
                1: {
                    body: ['Well <strong>Visitor</strong> this is the end of the road.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                2: {
                    body: ['Thanks for sticking with me.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                3: {
                    body: ['Don\'t forget to check out my case studies. 😁'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                4: {
                    body: ['<a href="/blog/redesigning-the-hiring-flow/" class="case-studies"><div class="media"><img srcset="img/th-hiring.png 1x, img/th-hiring@2x.png 2x"><div class="media-body"> <h5>Redesigning the hiring flow </h5><small class="muted-link">The hiring flow is how customers find and decide which freelancer to hire...</small></div></div></a>'],
                    delay: 1500,
                    loadingDelay: 1500,
                    linkPreview: true
                },
                5: {
                    body: ['<a href="/blog/improving-search-relevance/" class="case-studies"><div class="media"><img srcset="img/th-search.png 1x, img/th-search@2x.png 2x"><div class="media-body"> <h5>Improving search relevance </h5><small class="muted-link">So lets say you wanna find freelancers for an upcoming job. What do you do?</small></div></div></a>'],
                    delay: 1500,
                    loadingDelay: 1500,
                    linkPreview: true
                },
                6: {
                    body: ['<a href="/blog/restructuring-upworks-marketplace/" class="case-studies"><div class="media"><img srcset="/img/th-restruct.png 1x, /img/th-restruct@2x.png 2x"><div class="media-body"><h5>Restructuring Upworks marketplace </h5><small class="muted-link">Upworks marketplace relies on freelancers accurately marketing...</small></div></div></a>'],
                    delay: 1500,
                    loadingDelay: 1500,
                    linkPreview: true
                },
                7: {
                    body: ['If you\'ve got questions, or just want to say hi; drop me a line <a href="#">hayden@haydentarr.com</a>.'],
                    delay: 1000,
                    loadingDelay: 1500
                }
            }
        }
    },
    // Question Options
    responsesOptions = {
        0: {
                1: {
                    body: ['<strong>Tl;DR</strong> version, sort of.'],
                    delay: 500,
                    loadingDelay: 1000,
                    metadata: [true, 3, false, true]
                },
                2: {
                    body: ['<strong>1.</strong> Finding and solving a difficult problem, is an amazing feeling. Then getting feedback that leads to a better solution, even better. That loop never ends.'],
                    delay: 1000,
                    loadingDelay: 3000
                },
                3: {
                    body: ['<strong>2.</strong> There are soooo many layers to product design, I love there\'s always something new to learn.'],
                    delay: 1000,
                    loadingDelay: 4000
                }
            },
        1: {

                1: {
                    body: ['If I were to place a bet, It\'d be on augmented reality.'],
                    delay: 1000,
                    loadingDelay: 1500,
                    metadata: [true, 5, false, true]
                },
                2: {
                    body: ['<img src="https://media.giphy.com/media/l3q31866LjcZVU1X2/giphy.gif">'],
                    delay: 1000,
                    loadingDelay: 2500,
                    img: true
                },
                3: {
                    body: ['AR will be huge for enterprise, social, education, entertainment...'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                4: {
                    body: ['Sure its a little clunky now... Only a matter of time before the issues get ironed out.'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                5: {
                    body: ['The potential for creating experiences in the context of someone\'s environment is incredible.'],
                    delay: 1000,
                    loadingDelay: 2500
                }
            },
        2: {
                1: {
                    body: ['I looove video games, movies/tv & comics.'],
                    delay: 1000,
                    loadingDelay: 2500,
                    metadata: [true, 3, false, true]
                },
                2: {
                    body: ['<img src="https://media.giphy.com/media/l3q2MUGmoB2fd30FW/giphy.gif">'],
                    delay: 1500,
                    loadingDelay: 2500,
                    img: true
                },
                3: {
                    body: ['When I can, I like drawing or coding when an idea strikes.'],
                    delay: 1500,
                    loadingDelay: 3000
                }
            },
        3: {
                1: {
                    body: ['Okay you little scamp..'],
                    delay: 1000,
                    loadingDelay: 2500,
                    metadata: [true, 4, false, false]
                },
                2: {
                    body: ['Lets crack it open.'],
                    delay: 1500,
                    loadingDelay: 2500
                },
                3: {
                    body: ['<img src="https://media.giphy.com/media/A6Bz7V9XHD3BC/giphy.gif" >',
                           '<img src="https://media.giphy.com/media/l3vR0Ej8UNM5n0guI/source.gif">',
                           '<img src="https://media.giphy.com/media/145EpNSFwFqgUM/giphy.gif">',
                           '<img src="https://media.giphy.com/media/lGxzvXCajPAti/giphy.gif">',
                           '<img src="https://media.giphy.com/media/rZ9atB4EwV9tu/giphy.gif">',
                           '<img src="https://media.giphy.com/media/26xBKNOofzYIhQMjS/source.gif">',
                           ],
                    delay: 1500,
                    loadingDelay: 2000,
                    img: true
                },
                4: {
                    body: ['Ughhh, we probably shouldn\'t open this one.','Woh woh woh, you win some you lose some.','Oh, oh thats right its not actually a box.','Ughh not the box ghost, thats the worst.','Damn, the dog got to this one first.... Sorry','Awww yeah, sweet treasure map.'],
                    delay: 1500,
                    loadingDelay: 2500
                }
            }
    },
    // Question Reponses
    forkingResponses = {
        3: {
            tree0 : {
                1: {
                    body: ['Well, alright then.. where to start'],
                    delay: 500,
                    loadingDelay: 2000,
                    metadata: [false ,6, false]
                },
                2: {
                    body: ['My names <strong>Hayden</strong>'],
                    delay: 1000,
                    loadingDelay: 1800
                },
                3: {
                    body: ['I currently live in San Francisco'],
                    delay: 1200,
                    loadingDelay: 1400
                },
                4: {
                    body: ['🤔 On second thought'],
                    delay: 2000,
                    loadingDelay: 1200
                },
                5: {
                    body: ['It might be easier if you tell me whatcha want to know.'],
                    delay: 1700,
                    loadingDelay: 1000
                },
                6: {
                    body: ['<button class="button__primary button--full-width" data-question="0, 4">Why do you love designing products?</button><button class="button__primary button--full-width" data-question="1, 4">What\'s next for product design?</button><button class="button__primary button--full-width" data-question="2, 4">What else do you like doing?</button>'],
                    delay: 2300,
                    loadingDelay: 2500,
                    resReq: true
                }
            },
            tree1: {
                1: {
                    body: ['Guess what friendo, trick question. I\'m gonna tell you anyway 😜'],
                    delay: 500,
                    loadingDelay: 2000,
                    metadata: [false ,8, false]
                },
                2: {
                    body: ['<img src="https://media.giphy.com/media/srTYyZ1BjBtGU/giphy.gif" >'],
                    delay: 1000,
                    loadingDelay: 1700,
                    img: true
                },
                3: {
                    body: ['My names <strong>Hayden</strong>'],
                    delay: 1200,
                    loadingDelay: 1500
                },
                4: {
                    body: ['I currently live in San Francisco'],
                    delay: 600,
                    loadingDelay: 1500
                },
                5: {
                    body: ['🤔 On second thought..'],
                    delay: 2000,
                    loadingDelay: 1200
                },
                6: {
                    body: ['I know you said you\'re not interested'],
                    delay: 800,
                    loadingDelay: 1800
                },
                7: {
                    body: ['If you change your mind, tell me whatcha want to know.'],
                    delay: 1500,
                    loadingDelay: 2200
                },
                8: {
                    body: ['<button class="button__primary button--full-width" data-question="0, 4">Why do you love designing products?</button><button class="button__primary button--full-width" data-question="1, 4">What\'s next for product design?</button><button class="button__primary button--full-width" data-question="2, 4">What else do you like doing?</button>'],
                    delay: 1400,
                    loadingDelay: 1500,
                    resReq: true
                }
            }
        },
        5 : {

        },
        8 : {
            tree0 : {
                1: {
                    body: ['Gooood, goooood.'],
                    delay: 1000,
                    loadingDelay: 2000,
                    metadata: [true ,3, false],
                    resAvatar: 'img/star-wars-smile.png'
                },
                2: {
                    body: ['Here\'s to you and your victory over the dark side 🎉'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                3: {
                    body: ['<img src="https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif">'],
                    delay: 1500,
                    loadingDelay: 2500,
                    img: true
                }
            },
            tree1 : {
                1: {
                    body: ['😧 Oh, weird...'],
                    delay: 1000,
                    loadingDelay: 1500,
                    metadata: [true ,5, false],
                    resAvatar: 'img/star-wars-sad.png'
                },
                2: {
                    body: ['Looks like you selected <strong>Star Trek.</strong>'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                3: {
                    body: ['No worries, misclicks happen.'],
                    delay: 1000,
                    loadingDelay: 2000
                },
                4: {
                    body: ['Hopefully this will wash any thoughts of <strong>Star Trek</strong> away.'],
                    delay: 1500,
                    loadingDelay: 2500
                },
                5: {
                    body: ['<img src="https://media.giphy.com/media/26xBT24m72rOrNPiM/giphy.gif">'],
                    delay: 1000,
                    loadingDelay: 2500,
                    img: true
                }
            }
        },
        11: {

        },
        14: {
            tree0 : {
                1: {
                    body: ['The worlds greatest detective!'],
                    delay: 1000,
                    loadingDelay: 1000,
                    metadata: [true , 4, false],
                    resAvatar: 'img/batman.png'
                },
                2: {
                    body: ['He can do no wrong, well... except for batman vs. superman.'],
                    delay: 1500,
                    loadingDelay: 1500
                },
                3: {
                    body: ['<img src="https://media.giphy.com/media/DSjrgynsbGXD2/giphy.gif">'],
                    delay: 1500,
                    loadingDelay: 2500,
                    img: true
                },
                4: {
                    body: ['Even still, Batman is the best.'],
                    delay: 1500,
                    loadingDelay: 2500
                }
            },
            tree1 : {
                1: {
                    body: ['Tony Stark! The cheeky bugger.'],
                    delay: 1000,
                    loadingDelay: 1500,
                    metadata: [true , 4, false],
                    resAvatar: 'img/iron-man.png'
                },
                2: {
                    body: ['<img src="https://media.giphy.com/media/oRcyaid74GguI/giphy.gif">'],
                    delay: 1000,
                    loadingDelay: 2000,
                    img: true
                },
                3: {
                    body: ['Avenger, endless tech, friends with spiderman.'],
                    delay: 1000,
                    loadingDelay: 1500
                },
                4: {
                    body: ['Hell Yeah, Iron Man\'s the best :)'],
                    delay: 1000,
                    loadingDelay: 2000
                }
            }
        },
        17: {

        }
    };

    class Message  {
        constructor(userCount) {
            this.userCount = userCount;
            this.cm = document.getElementById('chatmessages');

            //Bind This
            this.selectSection = this.selectSection.bind(this);
            this.showSad = this.showSad.bind(this);
            this.reRunFn = this.reRunFn.bind(this);

            this.mobile = isMobileDevice();
            this.sequenceBuilder(1, 0);
        }
        chatResize(msgHeight) {
            const height = this.cm.scrollHeight;
            let offset = 100;

            if (msgHeight) {
                offset = offset + msgHeight;
            }

            if (this.section > 1) {

                //Don't jump to the bottom if they scroll up
                if (height - (this.cm.scrollTop + this.cm.clientHeight) <= offset) { 
                    //console.log("scrollTop is further than 300 pixels from the bottom");
                    this.cm.scrollTop = height;
                    this.mobile = this.mobile; 
                }
            }
        }

        hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
        }

        /*
        animateScroll () {

            // DESIGN CHANGE MAY NOT NEED

            // increment the time
            message.currentTime += message.increment;
            // find the value with the quadratic in-out easing function
            var t = message.currentTime;
            var b = message.start;
            var c = message.change;
            var d = message.duration;
            var val;

            t /= d/2;
            if (t < 1) {
                val = c/2*t*t + b;
            }
            t--;
            val = -c/2 * (t*(t-2) - 1) + b;
            // move the document.body
            message.cm.scrollTop = val;
            document.documentElement.scrollTop = val;
            document.body.parentNode.scrollTop = val;
            document.body.scrollTop = val;
            // do the animation unless its over
            if (message.currentTime < message.duration) {
              window.requestAnimationFrame(message.animateScroll);
            }

        }
        scrollToTop () {

            // DESIGN CHANGE MAY NOT NEED

            message.currentTime = 0;
            message.increment = 20;
            message.duration = 1000;
            message.start = message.cm.scrollTop;
            message.change = 0 - message.start;
            message.animateScroll();
        }*/


        toggleVisible (type, msg, elm, tar, show) {

            //Toggle Message or Toggle Image
            let el;
            if (show) {
                el = msg;
            } else {
                el = document.querySelectorAll(msg+' '+elm)[0];
            }

            //add remove class js
            if (type == 'add') {

                if (el.classList) {
                  el.classList.add(tar);
                }
                else {
                  el.tar += ' ' + tar;
                }
            }
            if (type == 'remove') {
                if (el.classList) {
                  el.classList.remove(tar);
                }
                else {
                  el.tar = el.tar.replace(new RegExp('(^|\\b)' + tar.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
        }
        visbleFn ( msg ){
            //message.toggleVisible('add', msg, ' .message__indicator', 'message__indicator--hidden', false);
            const indicator = document.querySelector(msg + ' .message__indicator');

            this.toggleVisible( 'remove', msg, ' .message__content', 'message__content--hidden', false );
            indicator.parentNode.removeChild(indicator);

            const msgHeight = document.getElementById('user-' + this.userCount).clientHeight;

            this.chatResize(msgHeight);
        }

        questions (section) {
            return [`<button class="button__primary button--full-width" data-question="0, ${section}">Why do you love designing products?</button>`,
                `<button class="button__primary button--full-width" data-question="1, ${section}">What\'s next for product design?</button>`,
                `<button class="button__primary button--full-width" data-question="2, ${section}">What else do you like doing?</button>`,
                `<button class="button__primary button--full-width" data-question="3, 16">The Fabeled Mystery Box</button>`];
        }
        showMsg (delay) {
            //ISSUE WITH NESTED TIMEOUTS
            setTimeout(() => {
                const msg = '#user-'+this.userCount;
                this.visbleFn(msg);
                this.userCount++;
                // ADD A CATCH TO SEE IF SCROLLTOP HAS CHANGED NEGATIVLY IF YES DON'T RESIZE

            }, delay);


        }
        delaySection (index, value, delay) {
            setTimeout(() => this.sectionFn(index, value), delay);

        }
        showSad (event) {
            const elm = document.getElementById('imgPeak');

            if (event.type === 'mouseover' || event.type === 'focus') {
                this.toggleVisible('add', elm, null, 'show', true);
            } else {
                this.toggleVisible('remove', elm, null, 'show', true);
            }
        }
        sectionFn (index, value){

            // If only one option, reset response
            if (value.body[this.response] === undefined) this.response = 0;

            if (this.nextRes !== undefined) {
                //console.log('this.nextRes section', this.nextRes);
                if (index === 3) {
                    this.response = this.nextRes;
                }
                if (index === 4) {
                    this.response = this.nextRes;
                    this.nextRes = undefined;
                }

            }
            // Generate template for section

            //Fragments to stop reflow on append
            let msgFragment = document.createDocumentFragment();

            //Create Message template
            let msgTemplate = document.createElement('div');
                msgTemplate.setAttribute('id', `user-${this.userCount}`);
                msgTemplate.className = "message__body";
                msgTemplate.innerHTML = `<div class="message__indicator"><span></span><span></span><span></span></div><div class="message__content message__content--hidden">${value.body[this.response]}</div>`;
            
            //Add eventListener when response is required
            if (value.resReq){
                const el = msgTemplate.querySelector('.message__content');
                if (el.classList) el.classList.add('message__button');
                else if (!this.hasClass(el, 'message__button')) el.className += ' message__button';


                //If mobile use touchend event listener
                if (this.mobile) {
                    msgTemplate.addEventListener('touchend', this.selectSection);
                } else {
                    msgTemplate.addEventListener('click', this.selectSection);
                }
            }

            if (value.img) {
                const el = msgTemplate.querySelector('.message__content');
                if (el.classList) el.classList.add('message__img');
                else if (!this.hasClass(el, 'message__img')) el.className += ' message__img';
            }

            if (value.linkPreview) {
                const el = msgTemplate.querySelector('.message__content');
                if (el.classList) el.classList.add('message__link');
                else if (!this.hasClass(el, 'message__link')) el.className += ' message__link';
            }

            //Show sad face when hovering / focusing no
            if (value.sadRes) {
                if (!this.mobile) {
                    let sadFragment = document.createDocumentFragment();
                    let sadImg = document.createElement('img');
                    sadImg.setAttribute('id', "imgPeak");
                    sadImg.srcset="img/sad-hayden.png 1x, img/sad-hayden@2x.png 2x";
                    sadFragment.appendChild(sadImg);
                    const sadSelector = msgTemplate.querySelector('#showSad');

                    sadSelector.addEventListener('mouseover', this.showSad);
                    sadSelector.addEventListener('mouseout', this.showSad);
                    sadSelector.addEventListener('focus', this.showSad);
                    sadSelector.addEventListener('blur', this.showSad);

                    this.cm.appendChild(sadFragment);

                    sadFragment = null;
                }
            }
            //console.log('this.nextRes', this.nextRes);
            /*
            if (message.section === 18) {
                if (index === 3) {
                    message.t = 0;
                    message.startScrollTop = message.cm.scrollTop;
                    var scroll = msgTemplate.querySelector('#scrollTop');
                    scroll.addEventListener('click', message.scrollToTop);
                }
            }
            */

            //append to fragment
            msgFragment.appendChild(msgTemplate);

            // Append template
            document.querySelectorAll('#'+message.placeholder)[0].appendChild(msgFragment);

            msgFragment = null;

            // Set scroll to bottom 
            // ADD A CATCH TO SEE IF SCROLLTOP HAS CHANGED NEGATIVLY IF YES DON'T RESIZE
            this.chatResize();

            // Change when local storage exists
            if (index <= -1) {
                this.showMsg(value.loadingDelay);
            }

            // Return unless on last loop
            if (this.loopLength !== parseInt(index)) return;

            // Run next sequence function
            if (this.reRun) {
                window.setTimeout(this.reRunFn, value.loadingDelay + 1000);
            }

        }

        //REVIST WITH THIS

        reRunFn() {
            var nextSection = parseInt(this.section) + 1;
            this.sequenceBuilder(nextSection, this.response);
        }


        selectSection (event) {

            const nodeData = event.target.getAttribute("data-question").split(','),
                res = parseInt(nodeData[0]),
                section = parseInt(nodeData[1]);

            //th.addClass('button--selected').prop('disabled', true);
            const elem = event.target.parentNode;
            //console.log('elem', elem);
            // check mobile to see which event to remove
            if (this.mobile) {
                elem.parentNode.removeEventListener('touchend', this.selectSection);
            } else {
                elem.parentNode.removeEventListener('click', this.selectSection);
            }

            const sadSelector = elem.querySelector("#showSad");
            
            if (sadSelector && !this.mobile) {

                const img = document.getElementById('imgPeak');

                sadSelector.removeEventListener('mouseover', this.showSad);
                sadSelector.removeEventListener('mouseout', this.showSad);
                sadSelector.removeEventListener('focus', this.showSad);
                sadSelector.removeEventListener('blur', this.showSad);

                img.parentNode.removeChild(img);

            }
            elem.parentNode.parentNode.removeChild(elem.parentNode);

            this.sequenceBuilder(section, res);
            

        }
        sequenceBuilder (section, response) {

            const msgBlock = data[section],
                fork = msgBlock.forkingRes || false,
                dynamicRes = msgBlock.dynRes || false,
                user = 'msg-c-'+msgBlock.id;
            let timeoutDelay = 0,
                finalSet = [];

                this.section = section;
                this.response = response;
                this.tree = msgBlock.metadata[2];
                this.loopLength = msgBlock.metadata[1];
                this.reRun = msgBlock.metadata[0];
                this.placeholder = user + ' .message__placeholder';

                

            if (this.tree) {

                // set the response tree to use
                const treeRes = 'tree'+this.response;

                // Check if this is a forking response 
                if (fork) {

                    // Create object with key 'tree'
                    const fr = forkingResponses[section]['tree'+this.response] = {};

                    // Merge responses options into forking responses
                    Object.assign(fr, responsesOptions[this.response]);
                    responsesOptions[this.response][1].metadata[3] = false;
                }

                // replace message with the forking response
                msgBlock.message = forkingResponses[section][treeRes];

                // CHECK ES6 Way to set
                this.reRun = msgBlock.message[1].metadata[0];
                this.loopLength = msgBlock.message[1].metadata[1];
                this.tree = msgBlock.message[1].metadata[2];


                // Check if avatar should be replaced with response avatar
                if (msgBlock.message[1].hasOwnProperty('resAvatar')) {
                   msgBlock.avatar = msgBlock.message[1].resAvatar;
                }

            }

            // CHECK ML IF BREAKING

            // Figure out which buttons to show
            if (dynamicRes) {

                //Use es6 get?
                let getQs = this.questions(section + 1),
                    i = 0;

                    //console.log("getQs", getQs);

                // Loop through response to find which has been selected already
                for(; i < 4; i++) {

                    // Check if responses have been selected already
                    if (responsesOptions[i][1].metadata[3]) {

                        // Push message.questions that haven't been anwsered
                        finalSet.push(getQs[i]);
                    }

                }

                //Get length of message object
                const ml = Object.keys(data[section].message).length;
                //console.log("ml", ml);

                if(finalSet.length == 1) {
                    finalSet.push(getQs[3]);
                }

                // Add to data
                data[section].message[ml].body = [finalSet.join('')];
                //console.log("finalSet", finalSet);
            }


            // REPLACE

            if (section === 16 && response === 3) {
                this.nextRes = Math.floor(Math.random() * 6);
                //console.log('this.nextRes', this.nextRes);
            }


            // Set time information
            let timeStamp = new Date(), hours = timeStamp.getHours(), minutes = timeStamp.getMinutes();

            // Set am / pm
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;


            // Combine timestamps
            timeStamp = hours + ':' + minutes + ' ' + ampm;

            // Fragments to stop reflow on append section
            let sectionFragment = document.createDocumentFragment();

            // Create Message template
            let sectionTemplate = document.createElement('div');
                    sectionTemplate.id = user;
                    sectionTemplate.className = "message__container";
                    sectionTemplate.innerHTML = `<div class="media"><img class="message__avatar" srcset="${msgBlock.avatar}"><div class="media-body"><div class="message__name">${msgBlock.name}<span class="time-stamp">${timeStamp}</span></div><div class="message__placeholder"></div></div></div></div>`;

            if (msgBlock.name === 'Visitor') {
                sectionTemplate.className = "message__container message__visitor";
                sectionTemplate.innerHTML = `<div class="media"><div class="media-body"><div class="message__name"><span class="time-stamp"> ${timeStamp} </span>${msgBlock.name}</div><div class="message__placeholder"></div></div><img class="message__avatar" srcset="${msgBlock.avatar}"></div></div>`;
            }
            // Append to fragment
            sectionFragment.appendChild(sectionTemplate);

            // Append template
            this.cm.appendChild(sectionFragment);

            // Remove Fragment
            sectionFragment = null;


            const len = Object.keys(msgBlock.message).length + 1;
            let index = 1,
                delay = 0,
                loadingDelay = 0;
            this.len = len;
            this.block = msgBlock.message;

            //console.log('NEW SECTION TIMING BREAK.........');

            for (; index < len; index++) {

                const value = msgBlock.message[index];

                // On second load remove timeout so you can
                if (index <= -1) {
                    timeoutDelay = 0;
                    value.loadingDelay = 0;
                }
                if (loadingDelay === 0) {
                    loadingDelay = value.loadingDelay;
                }

                this.delaySection(index, value, delay);
                this.showMsg(loadingDelay);


                delay = delay + value.delay + value.loadingDelay;

                loadingDelay = delay + value.loadingDelay;
            }
        }
    }

    const message = new Message(1);

    const resetBottom = debounce( () => message.chatResize(), 250);

    // window.resize event listener
    window.addEventListener('resize,', resetBottom);
    
})();
  


