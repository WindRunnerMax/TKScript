
const website = {
    regexp: /boke112/,
    init: function($) {
        $("body").on("click", e => false);
        const template = `
            <style>
                :not(input):not(textarea)::selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }

                :not(input):not(textarea)::-moz-selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }
            </style>
        `;
        $("body").append(template.replace(/\s*/, " "));
    }
} 

export default website;