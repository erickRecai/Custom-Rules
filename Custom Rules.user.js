// ==UserScript==
// @name         Custom Rules
// @namespace    https://github.com/erickRecai
// @version      1.00.01
// @description  Creates a toolbar to place buttons from userscripts.
// @author       guyRicky

// @match        *://*/*
// @noframes

// @exclude      *://docs.google.com/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js

// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
/* jshint esversion: 6 */

(function () {
    'use strict';

    /*

    == IMPORTANT ==
    REQUIRES collapsable toolbar script to access which can be found here:

    - deleting local storage deletes saved custom rules/selectors.
    -- usually done when cookies/history is deleted.
    - uses CSS rules from collapsable toolbar.

    == last update: 6/17/2020 ==

    == todo ==

    == code markers ==
    AA. section for custom rules/selectors, stored in localStorage
    BA. support functions
    ZZ. script CSS

    */

    if (jQuery("#ctb-container1").length) {
    
        // ==== AA. edit custom rules/selectors ===================================================|
        
        jQuery("#ctb-container1").append( // button
            "<div id='toggle-custom-rules' class='ctb-yellow ctb-rounded-block'>edit cust rules</div>");
        jQuery("body").append( // text area element
            '<div id="custom-rules-main" class="ctb-hidden">'+

            //'<div id="rule-list" class="ctb-visible">'+
                '<div id="rule-list-sections">'+
                    '<button id="selectors-list" type="button">Selectors</button>'+
                    '<button class="rule-list list-active" type="button">Delete1</button>'+ //uses the exact key of the list.
                    '<button class="rule-list" type="button">Lowlight1</button>'+
                    '<button class="rule-list" type="button">Highlight1</button>'+
                    '<button id="example-list" type="button">Examples</button>'+
                '</div>'+
                '<div id="list-name">Delete1</div>'+
                '<div>delimited by new lines.<br>invalid rules usually prevents the filter script from working.<br>stored in local storage.</div>'+ //z1

                '<div id="text-area-buttons">'+
                    '<button id="custom-data-save" type="button">Save</button>'+
                    '<button id="custom-data-close" type="button">Close</button>'+
                    '<span id="data-saved" class="ctb-hidden">Data Saved.</span>'+
                "</div>"+

                '<textarea id="list-text-area"></textarea>'+
                '<div id="cust-selectors" class="ctb-hidden">'+
`<input name="parentSelector" type="text"><span>parent selector</span><br>
<input name="textSelector" type="text"><span>text selector</span><br>
<input name="secondTextSelector" type="text"><span>second selector</span><br>
<input name="hrefSelector" type="text"><span>href selector</span><br>
<input name="thirdTextSelector" type="text"><span>third text selector</span><br>`+
                "</div>"+

            '</div>');

        let keyTitle = "Delete1";
        let ruleList = window.localStorage.getItem(keyTitle);
        if (ruleList) {
            console.log("retrieved ("+ ruleList +") from "+ keyTitle);
            ruleList = ruleList.replace(/;/g, "\n");
            jQuery("#list-text-area").val(ruleList);
        }

        let ruleListIsOpen = 0; //controls what the ctb toggle button does.
        let textareaIdSelector = "#custom-rules-main";
        let textAreaIsOpen = 1;
        jQuery("#toggle-custom-rules").click(function(){
            if (!ruleListIsOpen) {
                ruleListIsOpen = 1;
                // ==== open rule list ====
                jQuery(textareaIdSelector).addClass("ctb-visible");
                jQuery(textareaIdSelector).removeClass("ctb-hidden");

            }else {
                ruleListIsOpen = 0;
                // ==== close rule list ====
                jQuery(textareaIdSelector).addClass("ctb-hidden");
                jQuery(textareaIdSelector).removeClass("ctb-visible");
            }
        });

        jQuery(".rule-list").click(function(){
            if (!textAreaIsOpen) {
                textAreaIsOpen = 1;
                switchClasses(
                    "#cust-selectors",
                    "#list-text-area",
                    "ctb-visible",
                    "ctb-hidden"
                );
            }

            let keyTitle = jQuery(this).text();
            if (keyTitle) {
                jQuery("#list-name").text(keyTitle);
                jQuery(".list-active").removeClass("list-active");
                jQuery(this).addClass("list-active");

                jQuery("#list-text-area").attr("readonly", false); 
                if (window.localStorage.getItem(keyTitle)) {
                    let ruleList = window.localStorage.getItem(keyTitle);
                    console.log("retrieved ("+ ruleList +") from "+ keyTitle);
                    ruleList = ruleList.replace(/;/g, "\n");
                    jQuery("#list-text-area").val(ruleList);
                }else {
                    jQuery("#list-text-area").val("");
                }
                jQuery("#custom-data-save").removeClass("ctb-hidden");
            }
            
        });
        jQuery("#selectors-list").click(function(){
            textAreaIsOpen = 0;
            jQuery(".list-active").removeClass("list-active");
            jQuery(this).addClass("list-active");

            let keyTitle = jQuery(this).text();
            if (keyTitle) {
                jQuery("#list-name").text(keyTitle);
            }

            //a1
            let keyList = ["parentSelector", "textSelector", "secondTextSelector", "hrefSelector", "thirdTextSelector"];
            for (let index = 0; index < keyList.length; index++) {
                let keyName = keyList[index];
                let currentValue = window.localStorage.getItem(keyName);
                jQuery('input[name="'+ keyName +'"]').val(currentValue);
                //console.log("["+ keyName +" ## "+ currentValue +"]");
            }

            switchClasses(
                "#list-text-area",
                "#cust-selectors",
                "ctb-visible",
                "ctb-hidden"
            );
            
        });
        
        jQuery("#example-list").click(function(){
            jQuery("#custom-data-save").addClass("ctb-hidden");
            
            if (!textAreaIsOpen) {
                textAreaIsOpen = 1;
                switchClasses(
                    "#cust-selectors",
                    "#list-text-area",
                    "ctb-visible",
                    "ctb-hidden"
                );
            }

            let keyTitle = jQuery(this).text();
            if (keyTitle) {
                jQuery("#list-name").text(keyTitle);
                jQuery(".list-active").removeClass("list-active");
                jQuery(this).addClass("list-active");

                jQuery("#list-text-area").attr("readonly", false);
                jQuery("#list-text-area").val(
    `## comment ## everything after a '##' in a line is ignored.
    ## blank lines are ignored.
    ^\\w*$ ## text with only characters, no white space.
    ^\\w*\\s\\w*$ ## text with only one white space between.
    /word/i ## flags can be set right after the expression separated by a '/'.`
                );
            }
            
        });

        jQuery("#custom-data-save").click(function(){
            if (textAreaIsOpen) {
                let listRules;
                let keyTitle = jQuery("#list-name").text();

                // ==== save current list. ====
                listRules = jQuery("#list-text-area").val();
                listRules = listRules.replace(/\n/g, ";");
                console.log("("+ listRules +") saved to "+ keyTitle);
                window.localStorage.setItem(keyTitle, listRules);
                
            }else { //state 0, editing cust selectors.
                //a2
                let keyList = ["parentSelector", "textSelector", "secondTextSelector", "hrefSelector", "durationSelector"];
                for (let index = 0; index < keyList.length; index++) {
                    let keyName = keyList[index];
                    let newValue = jQuery('input[name="'+ keyName +'"]').val();
                    window.localStorage.setItem(keyName, newValue);
                    console.log("["+ keyName +" ## "+ newValue +"]");
                }
            }

            // == temporary indicator that data was saved. ==
            jQuery("#data-saved").addClass("ctb-visible-inline");
            let messageDuration = 5;
            setTimeout(function() {
                jQuery("#data-saved").removeClass("ctb-visible-inline");
            }, messageDuration*1000);

        });
        jQuery("#custom-data-close").click(function(){

            // ==== close rule list ====
            jQuery(textareaIdSelector).addClass("ctb-hidden");
            jQuery(textareaIdSelector).removeClass("ctb-visible");
        });

        // ==== BA. ctb events/functions ==========================================================|

        function switchClasses(mainSelector, subSelector, removedClass, newClass) {
            jQuery(mainSelector).removeClass(removedClass);
            jQuery(mainSelector).addClass(newClass);
            jQuery(subSelector).removeClass(newClass);
            jQuery(subSelector).addClass(removedClass);
        }

        // ==== ZZ. script CSS ====================================================================|

        // b1
        if(1){
            const scriptCss =
`<style type="text/css">
    
    #custom-rules-main { /* main container */
        padding: 5px !important;
        border: #999 solid 1px !important;
        border-radius: 10px !important;

        position: fixed;
        top: 5px;
        left: 5px;
        z-index: 99999;
        background: gold !important;
        color: black !important;
    }

    #custom-rules-main button { /* for all buttons */
        padding: 2px;
        border: 1px solid black;
        border-radius: 3px;
        margin: 3px 0;
        margin-right: 3px;

        background: white;
        color: black;
    }
    #custom-rules-main button:hover{ /* indicates selected. */
        background: #ccc !important;
    }

    #rule-list-sections button{ /* indicates inactive. */
        font-weight: 500;
        color: #aaa;
    }
    #rule-list-sections button.list-active{
        color: #000;
    }

    #list-name,
    .list-active {
        font-weight: 900;
    }

    textarea#list-text-area {
        width: 400px;
        height: 250px;
        margin-top: 3px;
    }
    textarea#list-text-area:readonly {
        background: #ccc;
    }
    #cust-selectors>input{
        margin: 2px;
        width: 250px;
    }
</style>`;
            jQuery(document.body).append(scriptCss);
        }
        
    } // end if (#ctb-container1 exists)

})();