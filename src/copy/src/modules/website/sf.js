
const website = {
    regexp: /.*segmentfault\.com\/.+/,
    init: function($) {
        $("body").addClass("_sf_adjust_body");
        $("body").on("click", e => {
            $("body").css("padding-right", 0);
        });
    }
}; 

export default website;    
