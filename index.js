//global variables
const xg = 10;
const yg = 114;
const sq_gap_x = 5;
const sq_gap_y = 5;
const sq_len = 20;
const margin_x = 10;
const margin_y = 10;
const state_len_x = (4 * sq_len) + (3 * sq_gap_x);
const state_gap_x = 30;
const state_gap_y = 60;

const svg = d3.select("svg");

// utility functions
function filter_state(state, dataset) {
    /*
    input:
        state: state name as str
        dataset: full dataset to be filtered
    action:
        returns filtered state dataset from inputs
    */

    return dataset.filter(d => (d.state == state));

}

function get_party(d) {
    //returns party name from the input datapoint

    return d.party;

}

function party_color(party) {
    /*
    input:
        party: politcal party name as string
    output:
        Identifies input party str and 
        returns associated hex color code
    */

    if (party == "Republican") {

        return "#E81B23";

    } else if (party == "Democratic") {

        return "#00AEF3";

    } else if (party == "Independent") {

        return "#DAA520";

    } else if (party == "DFL") {
      
        return "#005273";
        
    } else if (party == "Democratic - NPL") {
      
        return "#225C73"
        
    } else {

        return "Black";

    }

}

function party_color_tooltip(party) {
    /*
    input:
        party: political party name as a string
    output:
        Identifies input party and 
        returns associated hex color code for tooltips
    */

    if (party == "Republican") {

        return "#EC7063";

    } else if (party == "Democratic") {

        return "#5DADE2";

    } else if (party == "Independent") {

        return "#F4D03F";

    } else if (party == "DFL") {
        
        return "#1F618D";

    } else if (party == "Democratic - NPL") {
      
        return "#21618C";
        
    } else {

        return "#95A5A6";

    }

}

function log(d) {
    // console logs input

    console.log(d);

}

function seat_color(d) {
    /*
    input:
        d: single data point from a dataset
    action:
        gets party of the datapoint using get_party
        gets party color for that party using party_color
    output:
        returns color hex code value
    */

    let party = get_party(d);
    let color = party_color(party);
    return color;

}

// initalizing tooltip variable
const tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

function chamber_logo(image_path) {
    /*
    input:
        image_path: dir path to the image
    action:
        takes image path and config variables to set defs svg:pattern
        draws the chamber chamber logo
    */

    var config = {
        "logo_size" : 80
    };

    var defs = svg.append('svg:defs');

    defs.append("svg:pattern")
        .attr("id", "ChamberLogo")
        .attr("width", config.logo_size)
        .attr("height", config.logo_size)
        .attr("patternUnits", "userSpaceOnUse")
        .append("svg:image")
        .attr("xlink:href", image_path)
        .attr("width", config.logo_size)
        .attr("height", config.logo_size)
        .attr("x", 0)
        .attr("y", 0);

    var logo_rect = svg.append("rect")
                    .attr("x", 80)
                    .attr("y", 0)
                    .attr("width", 80)
                    .attr("height", 80)
                    .style("fill", "url(#ChamberLogo)");

}

function congress_logo(image_path) {
    /*
    input:
        image_path: dir path to the image
    action:
        takes image path and config variables to set defs svg:pattern
        draws the congress logo
    */

    var config = {
        "logo_size" : 80
    };

    var defs = svg.append('svg:defs');

    defs.append("svg:pattern")
        .attr("id", "CongressLogo")
        .attr("width", config.logo_size)
        .attr("height", config.logo_size)
        .attr("patternUnits", "userSpaceOnUse")
        .append("svg:image")
        .attr("xlink:href", image_path)
        .attr("width", config.logo_size)
        .attr("height", config.logo_size)
        .attr("x", 0)
        .attr("y", 0);

    var logo_rect = svg.append("rect")
                    .attr("x", 1120)
                    .attr("y", 0)
                    .attr("width", 80)
                    .attr("height", 80)
                    .style("fill", "url(#CongressLogo)");

}

function details_panel() {
    // draws container box for the details panel

    svg.append("rect")
        .attr("x", "1270")
        .attr("y", "20")
        .attr("width", "460")
        .attr("height", "500")
        .attr("class", "DetailsPanel")

}

function display_presidents_text(name) {
    /*
    input:
        name: name of the president as str
    action: 
        takes in president's name input &
        displays the name along with text prefix
    */

    svg.append("text")
        .attr("x", 460)
        .attr("y", 20)
        .attr("class", "PresidentTextCategory")
        .text("President in Office: ");

    svg.append("text")
        .attr("x", 680)
        .attr("y", 20)
        .attr("class", "PresidentText")
        .text(name);

}

function display_presidents_and_elect_text(prez_name, elect_name) {
    /*
    input:
        prez_name: name of the president as str
        elect_name: name of the president elect as str
    action:
        takes in president's & president elects name from input &
        displays the names along with text prefix
    */

    svg.append("text")
        .attr("x", 310)
        .attr("y", 20)
        .attr("class", "PresidentTextCategory")
        .text("President in Office: ");

    svg.append("text")
        .attr("x", 530)
        .attr("y", 20)
        .attr("class", "PresidentText")
        .text(prez_name);

    svg.append("text")
        .attr("x", 700)
        .attr("y", 20)
        .attr("class", "PresidentTextCategory")
        .text("President Elect: ");

    svg.append("text")
        .attr("x", 880)
        .attr("y", 20)
        .attr("class", "PresidentText")
        .text(elect_name);

}

function display_presidents(year) {
    /*
    input:
        year: selected year from input event as int
    action:
        displays presidents text on the viz for the selected year
    */

    if (year == 2014) {

        display_presidents_text("Barack Obama");

    } else if (year == 2016) {

        display_presidents_and_elect_text("Barack Obama", "Donald Trump");
        
    } else if (year == 2018) {

        display_presidents_text("Donald Trump");

    } else if (year == 2020) {

        display_presidents_and_elect_text("Donald Trump", "Joseph Biden");

    }

}

function details_text(dataset, chamber, year) {
    /*
    input:
        dataset: full datatset for details
        chamber: chamber name for details as str
        year: year selected from input event as int
    action:
        builds the text and data text in the deatils panel from inputs
    */

    //sets variables for lines in the details panel
    let congress_data = dataset["Congress"];
    let year_congress_data = congress_data.filter(d => (d.year == year));
    year_congress_data = year_congress_data[0];
    let congress_start = year_congress_data.start;
    let congress_end = year_congress_data.end;
    let chamber_data = dataset[chamber];
    let year_data = chamber_data.filter(d => (d.year == year));
    year_data = year_data[0];
    let election_date_text = year_data["election date"];
    let l1_data = year_data.leader1;
    let l1_name = l1_data.name;
    let l1_party = l1_data.party;
    let l1_seat = l1_data["leader seat"];
    let l1_seats = l1_data["seats"];
    let l2_data = year_data.leader2;
    let l2_name = l2_data.name;
    let l2_party = l2_data.party;
    let l2_seat = l2_data["leader seat"];
    let l2_seats = l2_data["seats"];

    //console.log(year_congress_data);
    let congress_title_text = year_congress_data.number;
    //console.log(congress_title_text);
    let congress_title = svg.append("text")
                            .attr("x", "1310")
                            .attr("y", "50")
                            .attr("class", "CongressTitle")
                            .text(congress_title_text);

    let election_date = svg.append("text")
                            .attr("x", "1360")
                            .attr("y", "80")
                            .attr("class", "ElectionDate")
                            .text("Election Date: " + election_date_text);

    let start_end_dates = svg.append("text")
                            .attr("x", "1360")
                            .attr("y", "110")
                            .attr("class", "ElectionDate")
                            .text(congress_start + " - " + congress_end);
    
    let leader_category = svg.append("text")
                            .attr("x", "1280")
                            .attr("y", "150")
                            .attr("class", "DetailsCategories")
                            .text("Leader")

    let leader_1 = svg.append("text")
                        .attr("x", "1430")
                        .attr("y", "150")
                        .attr("class", "DetailsBodyText")
                        .text(l1_name);

    let leader_2 = svg.append("text")
                        .attr("x", "1580")
                        .attr("y", "150")
                        .attr("class", "DetailsBodyText")
                        .text(l2_name);

    let party_category = svg.append("text")
                            .attr("x", "1280")
                            .attr("y", "210")
                            .attr("class", "DetailsCategories")
                            .text("Party");

    let party_1 = svg.append("text")
                        .attr("x", "1430")
                        .attr("y", "210")
                        .attr("class", "DetailsBodyText")
                        .text(l1_party);

    let party_2 = svg.append("text")
                        .attr("x", "1580")
                        .attr("y", "210")
                        .attr("class", "DetailsBodyText")
                        .text(l2_party);

    let leader_seat_category = svg.append("text")
                                .attr("x", "1280")
                                .attr("y", "270")
                                .attr("class", "DetailsCategories")
                                .text("Leader Seat")

    let leader_seat_1 = svg.append("text")
                            .attr("x", "1430")
                            .attr("y", "270")
                            .attr("class", "DetailsBodyText")
                            .text(l1_seat);

    let leader_seat_2 = svg.append("text")
                            .attr("x", "1580")
                            .attr("y", "270")
                            .attr("class", "DetailsBodyText")
                            .text(l2_seat);

    let seats_won_category = svg.append("text")
                                .attr("x", "1280")
                                .attr("y", "330")
                                .attr("class", "DetailsCategories")
                                .text("Seats");

    let party_1_seats = svg.append("text")
                            .attr("x", "1430")
                            .attr("y", "330")
                            .attr("class", "DetailsBodyText")
                            .text(l1_seats);

    let party_2_seats = svg.append("text")
                            .attr("x", "1580")
                            .attr("y", "330")
                            .attr("class", "DetailsBodyText")
                            .text(l2_seats);

    let partition_line = svg.append("line")
                            .attr("x1", 1270)
                            .attr("y1", 360)
                            .attr("x2", 1730)
                            .attr("y2", 360)
                            .attr("class", "DetailsPartition");

    let bills_and_resolution_title = svg.append("text")
                                        .attr("x", "1360")
                                        .attr("y", "390")
                                        .attr("class", "BillResolutions")
                                        .text("Bills & Resolutions *");
    
    let bill_resolution_data = year_congress_data["Bills & Resolutions"];
    //console.log(bill_resolution_data);
    let chamber_bills_data = bill_resolution_data[chamber];
    //console.log(chamber_bills_data);

    // function to get the data of bills for the selected chamber
    function build_bills_data(chamber_bills_dataset) {
        /*
        input:
            chamber_bills_dataset: filtered dataset from details dataset for chamber bills data
        output:
            returns list of numbers indicating introduces, reported, passes bills respectively as metadata
        */

        let introduced = +chamber_bills_dataset.introduced;
        let reported = +chamber_bills_dataset.reported;
        let passed = +chamber_bills_dataset.passed;

        let out = [introduced, reported, passed]

        return out;

    }

    // draws the details data on the viz
    let bills_data = build_bills_data(chamber_bills_data);

    let introduced_category = svg.append("text")
                                .attr("x", "1280")
                                .attr("y", "420")
                                .attr("class", "BillsCategories")
                                .text("Introduced:")

    let introduced_number = svg.append("text")
                                .attr("x", "1378")
                                .attr("y", "420")
                                .attr("class", "BillsNumbers")
                                .text(bills_data[0]);

    let reported_category = svg.append("text")
                                .attr("x", "1450")
                                .attr("y", "420")
                                .attr("class", "BillsCategories")
                                .text("Reported:");

    let reported_number = svg.append("text")
                                .attr("x", "1533")
                                .attr("y", "420")
                                .attr("class", "BillsNumbers")
                                .text(bills_data[1]);

    let passed_category = svg.append("text")
                                .attr("x", "1600")
                                .attr("y", "420")
                                .attr("class", "BillsCategories")
                                .text("Passed:");

    let passed_number = svg.append("text")
                                .attr("x", "1666")
                                .attr("y", "420")
                                .attr("class", "BillsNumbers")
                                .text(bills_data[2]);

    let partition_line_2 = svg.append("line")
                                .attr("x1", 1270)
                                .attr("y1", 430)
                                .attr("x2", 1730)
                                .attr("y2", 430)
                                .attr("class", "DetailsPartition");

    let major_events_title = svg.append("text")
                                .attr("x", "1400")
                                .attr("y", "460")
                                .attr("class", "MajorEventTitle")
                                .text("Major Events");

    const arrow_path = ["M1400, 480 L1800, 480 M1750, 450 L1800, 480 M1750, 510 L1800, 480 Z"]
    let scroll_arrow = svg.append("path")
                            .attr("d", arrow_path)
                            .attr("class", "ScrollArrow");

    let scroll_text = svg.append("text")
                            .attr("x", "1594")
                            .attr("y", "475")
                            .attr("class", "ScrollText")
                            .text("Scroll for Major Events");

    let star_text = svg.append("text")
                        .attr("x", "1280")
                        .attr("y", "535")
                        .attr("class", "StarText")
                        .text("* not considering executive branch actions.")

}

function major_events_text_2014(dataset) {
    /*
    input:
        dataset: congress details dataset (JSON)
    action:
        writes/draws the major events for the congress term of 2014 - 2016
    */

    let congress_data = dataset["Congress"];
    let year_congress_data = congress_data.filter(d => (d.year == 2014));
    year_congress_data = year_congress_data[0];
    let major_events_data = year_congress_data["Major Events"];
    let number = year_congress_data.number;
    title_text = "Major events during the " + number;
    //console.log(major_events_data);

    let major_events_title_2 = svg.append("text")
                                    .attr("x", "1800")
                                    .attr("y", "50")
                                    .attr("class", "MajorEventTitle")
                                    .text(title_text);

    let start_y = 80;
    let del_y = 30;

    //writing major events
    let e1 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y)
                .attr("class", "MajorEvents")
                .text(major_events_data[0]);

    let e2 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 1))
                .attr("class", "MajorEvents")
                .text(major_events_data[1]);

    let e3 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 2))
                .attr("class", "MajorEvents")
                .text(major_events_data[2]);

    let e4 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 3))
                .attr("class", "MajorEvents")
                .text(major_events_data[3]);

    let e5 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 4))
                .attr("class", "MajorEvents")
                .text(major_events_data[4]);

    let e6 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 5))
                .attr("class", "MajorEvents")
                .text(major_events_data[5]);

    let e7 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 6))
                .attr("class", "MajorEvents")
                .text(major_events_data[6]);

    let e8 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 7))
                .attr("class", "MajorEvents")
                .text(major_events_data[7]);

    let e9 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 8))
                .attr("class", "MajorEvents")
                .text(major_events_data[8]);

}

function major_events_text_2016(dataset) {
    /*
    input:
        dataset: congress details dataset (JSON)
    action:
        writes/draws the major events for the congress term of 2016 - 2018
    */

    let congress_data = dataset["Congress"];
    let year_congress_data = congress_data.filter(d => (d.year == 2016));
    year_congress_data = year_congress_data[0];
    let major_events_data = year_congress_data["Major Events"];
    let number = year_congress_data.number;
    title_text = "Major events during the " + number;
    //console.log(major_events_data);

    let major_events_title_2 = svg.append("text")
                                    .attr("x", "1800")
                                    .attr("y", "50")
                                    .attr("class", "MajorEventTitle")
                                    .text(title_text);

    let start_y = 80;
    let del_y = 30;

    //writing major events
    let e1 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y)
                .attr("class", "MajorEvents")
                .text(major_events_data[0]);

    let e2 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 1))
                .attr("class", "MajorEvents")
                .text(major_events_data[1]);

    let e3 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 2))
                .attr("class", "MajorEvents")
                .text(major_events_data[2]);

    let e4 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 3))
                .attr("class", "MajorEvents")
                .text(major_events_data[3]);

    let e5 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 4))
                .attr("class", "MajorEvents")
                .text(major_events_data[4]);

    let e6 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 5))
                .attr("class", "MajorEvents")
                .text(major_events_data[5]);

    let e7 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 6))
                .attr("class", "MajorEvents")
                .text(major_events_data[6]);

    let e8 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 7))
                .attr("class", "MajorEvents")
                .text(major_events_data[7]);

    let e9 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 8))
                .attr("class", "MajorEvents")
                .text(major_events_data[8]);

}

function major_events_text_2018(dataset) {
    /*
    input:
        dataset: congress details dataset (JSON)
    action:
        writes/draws the major events for the congress term of 2018 - 2020
    */

    let congress_data = dataset["Congress"];
    let year_congress_data = congress_data.filter(d => (d.year == 2018));
    year_congress_data = year_congress_data[0];
    let major_events_data = year_congress_data["Major Events"];
    let number = year_congress_data.number;
    title_text = "Major events during the " + number;
    //console.log(major_events_data);

    let major_events_title_2 = svg.append("text")
                                    .attr("x", "1800")
                                    .attr("y", "50")
                                    .attr("class", "MajorEventTitle")
                                    .text(title_text);

    let start_y = 80;
    let del_y = 30;

    //writing major events
    let e1 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y)
                .attr("class", "MajorEvents")
                .text(major_events_data[0]);

    let e2 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 1))
                .attr("class", "MajorEvents")
                .text(major_events_data[1]);

    let e3 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 2))
                .attr("class", "MajorEvents")
                .text(major_events_data[2]);

    let e4 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 3))
                .attr("class", "MajorEvents")
                .text(major_events_data[3]);

    let e5 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 4))
                .attr("class", "MajorEvents")
                .text(major_events_data[4]);

    let e6 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 5))
                .attr("class", "MajorEvents")
                .text(major_events_data[5]);

    let e7 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 6))
                .attr("class", "MajorEvents")
                .text(major_events_data[6]);

    let e8 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 7))
                .attr("class", "MajorEvents")
                .text(major_events_data[7]);

    let e9 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 8))
                .attr("class", "MajorEvents")
                .text(major_events_data[8]);

    let e10 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 9))
                .attr("class", "MajorEvents")
                .text(major_events_data[9]);

    let e11 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 10))
                .attr("class", "MajorEvents")
                .text(major_events_data[10]);

    let e12 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 11))
                .attr("class", "MajorEvents")
                .text(major_events_data[11]);

    let e13 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 12))
                .attr("class", "MajorEvents")
                .text(major_events_data[12]);

    let e14 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 13))
                .attr("class", "MajorEvents")
                .text(major_events_data[13]);

    let e15 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 14))
                .attr("class", "MajorEvents")
                .text(major_events_data[14]);

}

function major_events_text_2020(dataset) {
    /*
    input:
        dataset: congress details dataset (JSON)
    action:
        writes/draws the major events for the congress term of 2020 - 2022
    */

    let congress_data = dataset["Congress"];
    let year_congress_data = congress_data.filter(d => (d.year == 2020));
    year_congress_data = year_congress_data[0];
    let major_events_data = year_congress_data["Major Events"];
    let number = year_congress_data.number;
    title_text = "Major events during the " + number;
    //console.log(major_events_data);

    let major_events_title_2 = svg.append("text")
                                    .attr("x", "1800")
                                    .attr("y", "50")
                                    .attr("class", "MajorEventTitle")
                                    .text(title_text);

    let start_y = 80;
    let del_y = 30;

    //writing major events
    let e1 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y)
                .attr("class", "MajorEvents")
                .text(major_events_data[0]);

    let e2 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 1))
                .attr("class", "MajorEvents")
                .text(major_events_data[1]);

    let e3 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 2))
                .attr("class", "MajorEvents")
                .text(major_events_data[2]);

    let e4 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 3))
                .attr("class", "MajorEvents")
                .text(major_events_data[3]);

    let e5 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 4))
                .attr("class", "MajorEvents")
                .text(major_events_data[4]);

    let e6 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 5))
                .attr("class", "MajorEvents")
                .text(major_events_data[5]);

    let e7 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 6))
                .attr("class", "MajorEvents")
                .text(major_events_data[6]);

    let e8 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 7))
                .attr("class", "MajorEvents")
                .text(major_events_data[7]);

    let e9 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 8))
                .attr("class", "MajorEvents")
                .text(major_events_data[8]);

    let e10 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 9))
                .attr("class", "MajorEvents")
                .text(major_events_data[9]);

    let e11 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 10))
                .attr("class", "MajorEvents")
                .text(major_events_data[10]);

    let e12 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 11))
                .attr("class", "MajorEvents")
                .text(major_events_data[11]);

    let e13 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 12))
                .attr("class", "MajorEvents")
                .text(major_events_data[12]);

    let e14 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 13))
                .attr("class", "MajorEvents")
                .text(major_events_data[13]);

    let e15 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 14))
                .attr("class", "MajorEvents")
                .text(major_events_data[14]);

    let e16 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 15))
                .attr("class", "MajorEvents")
                .text(major_events_data[15]);

    let e17 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 16))
                .attr("class", "MajorEvents")
                .text(major_events_data[16]);

    let e18 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 17))
                .attr("class", "MajorEvents")
                .text(major_events_data[17]);

    let e19 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 18))
                .attr("class", "MajorEvents")
                .text(major_events_data[18]);

    let e20 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 19))
                .attr("class", "MajorEvents")
                .text(major_events_data[19]);

    let e21 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 20))
                .attr("class", "MajorEvents")
                .text(major_events_data[20]);

    let e22 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 21))
                .attr("class", "MajorEvents")
                .text(major_events_data[21]);

    let e23 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 22))
                .attr("class", "MajorEvents")
                .text(major_events_data[22]);

    let e24 = svg.append("text")
                .attr("x", "1800")
                .attr("y", start_y + (del_y * 23))
                .attr("class", "MajorEvents")
                .text(major_events_data[23]);

}

function major_events(dataset, year) {
    /*
    input:
        dataset: congress details dataset (JSON)
        year: selected year through input event
    action:
        writes/draws the major events for the selected (year) congress term
    */

    if (year == 2014) {

        major_events_text_2014(dataset);

    } else if (year == 2016) {

        major_events_text_2016(dataset);

    } else if (year == 2018) {

        major_events_text_2018(dataset);

    } else if (year == 2020) {

        major_events_text_2020(dataset);

    };

}

//TODO: Find solutions to make tooltips for unique ids instead of common ids
function state_tooltips(id, dataset) {
    /*
    input:
        id: css id -> (`state`_seat) for the selected datatpoint
        dataset: filtered dataset from the input
    action:
        draws the tooltip & its metedata when the event is triggered through hover
    */

    //console.log(dataset)
    svg.selectAll("#" + id)
            .data(dataset)
            .join("rect")
            .on("mouseover", (event, d) => {
                let color = party_color_tooltip(d.party);
                d3.select("#tooltip")
                .transition()
                .duration(300)
                .style("opacity", 1)
                .style("background", color)
                .style("left", (event.pageX + 12) + "px")
                .style("top", (event.pageY + 0) + "px")
                tooltip.html(d.state + ", " + d.district + "<br>" + d.representative + "<br>" + d.party);
            })
            .on("mouseout", (event, d) => {
                d3.select("#tooltip")
                .transition()
                .style("opacity", 0);
            })
            .on("mousemove", (event, d) => {
                d3.select("#tooltip")
                .style("left", (event.pageX + 12) + "px")
                .style("top", (event.pageY + 0) + "px")
            });

}

function construct_seats(seats_num, cols, dx, dy, dataset, state) {
    /*
    input:
        seats_num: number of seats to be constructed (depretiated)
        cols: number of cols to be used in arranging the seats
        dx: starting x co-ordinate
        dy: starting y co-ordinate
        dataset: filtered state dataset
        state: state name as a str
    action:
        constructs seats for states vertically
        intialises tooltip events for the constructed seats
    */
    
    //initialising relative variables
    let d_xg = xg + dx; // xg => ground x co-ordinate
    let d_yg = yg + dy; // yg => ground y co-ordinate
    let fx = sq_len + sq_gap_x; // sq_len => len of sq (set as global var); sq_gap_x => x gap b/w 2 sq (set as global var)
    let fy = sq_len + sq_gap_y; // sq_gap_y => y gap b/w 2 sq (set as global var)
    let id = state + "_seat" // id => css is for current state
    
    function x_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns xf => the final x coordinate for the seat 
                          for data point at index i from the dataset
        */

        let seat_pos_x = i % cols;
        let xf = d_xg + (seat_pos_x * fx);
        return xf

    }

    function y_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns yf => the final y coordinate for the seat 
                          for data point at index i from the dataset
        */
        let seat_pos_y = Math.floor(i / cols);
        let yf = d_yg + (seat_pos_y * fy);
        return yf

    }

    svg.selectAll("g")
        .data(dataset)
        .join("rect")
        .attr("x", (d, i) => (x_val(i)))
        .attr("y", (d, i) => (y_val(i)))
        .attr("width", sq_len)
        .attr("height", sq_len)
        .attr("class", "HouseSeats")
        .attr("id", d => (id))
        .attr("stroke", "black")
        .attr("fill", d => (seat_color(d)));

    let tooltip = state_tooltips(id, dataset);

}

function construct_seats_horizontal(seats_num, rows, dx, dy, dataset) {
    /*
    NOTE: Function is depretiated
    input:
        seats_num: number of seats to be constructed (depretiated)
        rows: number of rows to be used in arranging the seats
        dx: starting x co-ordinate
        dy: starting y co-ordinate
        dataset: filtered state dataset
    action:
        constructs seats for states vertically
    */

    //initialising relative variables
    let d_xg = xg + dx; // xg => ground x co-ordinate
    let d_yg = yg + dy; // yg => ground y co-ordinate
    let fx = sq_len + sq_gap_x; // sq_len => len of sq (set as global var); sq_gap_x => x gap b/w 2 sq (set as global var)
    let fy = sq_len + sq_gap_y; // sq_gap_y => y gap b/w 2 sq (set as global var)

    function x_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns xf => the final x coordinate for the seat 
                          for data point at index i from the dataset
        */
        let seat_pos_x = Math.floor(i / rows);
        let xf = d_xg + (seat_pos_x * fx);
        return xf

    }

    function y_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns yf => the final y coordinate for the seat 
                          for data point at index i from the dataset
        */
        let seat_pos_y = i % rows;
        let yf = d_yg + (seat_pos_y * fy);
        return yf

    }

    svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (x_val(i)))
        .attr("y", (d, i) => (y_val(i)))
        .attr("width", sq_len)
        .attr("heignt", sq_len)
        .attr("stroke", "black")
        .attr("opacity", "60%")
        .attr("fill", "gray");

}

//TODO: combine dx dy builder function (below 3) into single function
function col_x_build(col) {
    /*
    input:
        col: col number as an int in which the state belongs to in the visualization
    returns:
        out: the starting x coordinate for drawing the state's seats.
    */

    let factor = col - 1
    const out = margin_x + (factor * state_len_x) + (factor * state_gap_x);
    return out;

}

function state_len_y(y_seat_rows) {
    /*
    input:
        y_seat_rows: number of rows of seats drawn before the states seats
    output:
        out: length calculated to input in calcualtion of the y coordinates 
             for drawing new states
    */

    const out = (y_seat_rows * sq_len) + ((y_seat_rows - 1) * sq_gap_y);
    return out;

}

function row_y_build(row, y_seat_rows, number_states_y = 1) {
    /*
    input:
        row: current row as an int for the current states in current col
        y_seat_rows: number of rows of seats drawn before the states seats
        number_states_y: default set to 1; number of states on the above the current state in the same col
                         the first state is deafulted as 1
    output:
        out: the starting y coordinate for the current state to draw the seats.
    */

    let factor = row - 1;
    let del_f = (number_states_y - 1) * sq_gap_y;
    let state_len = state_len_y(y_seat_rows);
    const out = margin_y + (state_len) + (factor * state_gap_y) - del_f;
    return out;

}

function state_labels_house(state, x, y) {
    /*
    input:
        state: state name as str
        x: starting x coordinate
        y: starting y coordinate
    action:
        writes(draws) the input state's name
    */

    let fx = xg + x;
    let fy = yg + y - 5;

    svg.append("text")
        .attr("x", fx)
        .attr("y", fy)
        .attr("class", "HouseStateLabels")
        .text(state);

}

function compile_coordinates(col, rows_args) {
    /*
    input:
        col: current column number for the coordinates to be compiled
        rows_args: list of list containing the 
                   inputs (row, y_seat_rows, number_states_y) for calculating dy
                   for the states to be drawn
    action:
        creates a list of output coordinates conatining the dx & dy for all the inputs
        in the format [dx, ...dy]
    output:
        out_list: coordinate list for the (to be drawn)states corresponding to the row_args
                  in the format [dx, ...dy]
    */

    const col_x = col_x_build(col);
    let out_list = [col_x];

    for (let i = 0; i < rows_args.length; i++) {

        let arg = rows_args[i];

        // log(arg.length);
        if (arg.length == 2) {
            let row = arg[0];
            let y_seat_rows = arg[1];
            let dy = row_y_build(row, y_seat_rows);
            out_list.push(dy);
        }

        if (arg.length == 3) {
            let row = arg[0];
            let y_seat_rows = arg[1];
            let number_states_y = arg[2];
            let dy = row_y_build(row, y_seat_rows, number_states_y);
            out_list.push(dy);
        }
    }
    // console.log(out_list);
    return out_list;

}

function compile_state_house(state_name, year_dataset, dx, dy, seat_num, cols, state_ini) {
    /*
    input:
        state_name: name of the state as a str
        year_dataset: dataset filtered by year
        dx: starting x coordinate
        dy: starting y coordinate
        seat_num: number of seats to be drawn (depretiated)
        cols: number of cols in the alignment as a int
        state_ini: state initials (all caps) as a str
    action:
        data: creates a dataset with filtered data for the input state
        state_label: creates the state label
        state: creates the state var with state seats drawn
    output:
        returns a list of the variables created in action
    */

    let data = filter_state(state_name, year_dataset);
    const state_label = state_labels_house(state_name, dx, dy);
    let state = construct_seats(seat_num, cols, dx, dy, data, state_ini);
    return [data, state_label, state]
}

function display_house_seats(year_dataset) {
    /*
    input:
        year_dataset: dataset filtered for the selected year
    action:
        sets the row args for all the states in the sequence of visualization columns
        gets the coordinates for all states using compile_coordinates fxn
        draws the seats of HOR for all the states in the same sequence using compile_state_house fxn
    */

    // drawing House col 1, states=[washington, oregon, california]
    const col_1_row_args = [[1, 0], [2, 3, 1], [3, 5, 2]];
    [col_1_x, row_1_col_1, row_2_col_1, row_3_col_1] = compile_coordinates(1, col_1_row_args);
    [washington_data, washigton_label, washington] = compile_state_house("Washington", year_dataset, col_1_x, row_1_col_1, 10, 4, "WA");
    [oregon_data, oregon_label, oregon] = compile_state_house("Oregon", year_dataset, col_1_x, row_2_col_1, 5, 4, "OR");
    [california_data, california_label, california] = compile_state_house("California", year_dataset, col_1_x, row_3_col_1, 53, 4, "CA");

    // drawing House col 2, states=[idaho, utah, nevada, arizona, new mexico, texas]
    const col_2_row_args = [[1, 0], [2, 1, 1], [3, 2, 2], [4, 3, 3], [5, 6, 4], [6, 7, 5]];
    [col_2_x, row_1_col_2, row_2_col_2, row_3_col_2, row_4_col_2, row_5_col_2, row_6_col_2] = compile_coordinates(2, col_2_row_args);
    [idaho_data, idaho_label, idaho] = compile_state_house("Idaho", year_dataset, col_2_x, row_1_col_2, 2, 4, "ID");
    [utah_data, utah_label, utah] = compile_state_house("Utah", year_dataset, col_2_x, row_2_col_2, 4, 4, "UT");
    [nevada_data, nevada_label, nevada] = compile_state_house("Nevada", year_dataset, col_2_x, row_3_col_2, 4, 4, "NV");
    [arizona_data, arizona_label, arizona] = compile_state_house("Arizona", year_dataset, col_2_x, row_4_col_2, 9, 4, "AZ");
    [new_mexico_data, new_mexico_label, new_mexico] = compile_state_house("New Mexico", year_dataset, col_2_x, row_5_col_2, 3, 4, "NM");
    
    [texas_data, texas_label, texas] = compile_state_house("Texas", year_dataset, col_2_x, row_6_col_2, 36, 9, "TX");

    // drawing House col 3, states=[montana, wyoming, colorado, kansas, oklahoma]
    const col_3_row_args = [[1, 0], [2, 1, 1], [3, 2, 2], [4, 4, 3], [5, 5, 4]];
    [col_3_x, row_1_col_3, row_2_col_3, row_3_col_3, row_4_col_3, row_5_col_3] = compile_coordinates(3, col_3_row_args);
    [montana_data, montana_label, montana] = compile_state_house("Montana", year_dataset, col_3_x, row_1_col_3, 1, 4, "MT");
    [wyoming_data, wyoming_label, wyoming] = compile_state_house("Wyoming", year_dataset, col_3_x, row_2_col_3, 1, 4, "WY");
    [colorado_data, colorado_label, colorado] = compile_state_house("Colorado", year_dataset, col_3_x, row_3_col_3, 7, 4, "CO");
    [kansas_data, kansas_label, kansas] = compile_state_house("Kansas", year_dataset, col_3_x, row_4_col_3, 4, 4, "KS");
    [oklahoma_data, oklahoma_label, oklahoma] = compile_state_house("Oklahoma", year_dataset, col_3_x, row_5_col_3, 5, 4, "OK");
    
    // drawing House col 4, states=[north dacota, south dacota, nebraska, arkansas, louisiana, alaska, hawaii]
    const col_4_row_args = [[1, 0], [2, 1, 1], [3, 2, 2], [4, 3, 3], [5, 4, 4], [6, 6, 5], [7, 7, 6]];
    [col_4_x, row_1_col_4, row_2_col_4, row_3_col_4, row_4_col_4, row_5_col_4, row_6_col_4, row_7_col_4] = compile_coordinates(4, col_4_row_args);
    [north_dacota_data, north_dacota_label, north_dacota] = compile_state_house("North Dakota", year_dataset, col_4_x, row_1_col_4, 1, 4, "ND");
    [south_dacota_data, south_dacota_label, south_dacota] = compile_state_house("South Dakota", year_dataset, col_4_x, row_2_col_4, 1, 4, "SD");
    [nebraska_data, nebraska_label, nebraska] = compile_state_house("Nebraska", year_dataset, col_4_x, row_3_col_4, 3, 4, "NE");
    [arkansas_data, arkansas_label, arkansas] = compile_state_house("Arkansas", year_dataset, col_4_x, row_4_col_4, 4, 4, "AR");
    [louisiana_data, louisiana_label, louisiana] = compile_state_house("Louisiana", year_dataset, col_4_x, row_5_col_4, 6, 4, "LA");
    [alaska_data, alaska_label, alaska] = compile_state_house("Alaska", year_dataset, col_4_x, row_6_col_4, 1, 4, "AK");
    [hawaii_data, hawaii_label, hawaii] = compile_state_house("Hawaii", year_dataset, col_4_x, row_7_col_4, 2, 4, "HI");
    
    // drawing House col 5, states=[minnesota, iowa, missouri, kentucky, tennessee, mississippi]
    const col_5_row_args = [[1, 0], [2, 2, 1], [3, 3, 2], [4, 5, 3], [5, 7, 4], [6, 10, 5]];
    [col_5_x, row_1_col_5, row_2_col_5, row_3_col_5, row_4_col_5, row_5_col_5, row_6_col_5] = compile_coordinates(5, col_5_row_args);
    [minnesota_data, minnesota_label, minnesota] = compile_state_house("Minnesota", year_dataset, col_5_x, row_1_col_5, 8, 4, "MN");
    [iowa_data, iowa_label, iowa] = compile_state_house("Iowa", year_dataset, col_5_x, row_2_col_5, 4, 4, "IA");
    [missouri_data, missouri_label, missouri] = compile_state_house("Missouri", year_dataset, col_5_x, row_3_col_5, 8, 4, "MO");
    [kentucky_data, kentucky_label, kentucky] = compile_state_house("Kentucky", year_dataset, col_5_x, row_4_col_5, 6, 4, "KY");
    [tennessee_data, tennessee_label, tennessee] = compile_state_house("Tennessee", year_dataset, col_5_x, row_5_col_5, 9, 4, "TN");
    [mississippi_data, mississippi_label, mississippi] = compile_state_house("Mississippi", year_dataset, col_5_x, row_6_col_5, 4, 4, "MS");
    
    // drawing House col 6, states=[wisconsin, illinois, indiana, alabama, georgia]
    const col_6_row_args = [[1, 0], [2, 2, 1], [3, 7, 2], [4, 10, 3], [5, 12, 4]];
    [col_6_x, row_1_col_6, row_2_col_6, row_3_col_6, row_4_col_6, row_5_col_6] = compile_coordinates(6, col_6_row_args);
    [wisconsin_data, wisconsin_label, wisconsin] = compile_state_house("Wisconsin", year_dataset, col_6_x, row_1_col_6, 8, 4, "WI");
    [illinois_data, illinois_label, illinois] = compile_state_house("Illinois", year_dataset, col_6_x, row_2_col_6, 18, 4, "IL");
    [indiana_data, indiana_label, indiana] = compile_state_house("Indiana", year_dataset, col_6_x, row_3_col_6, 9, 4, "IN");
    [alabama_data, alabama_label, alabama] = compile_state_house("Alabama", year_dataset, col_6_x, row_4_col_6, 7, 4, "AL");
    [georgia_data, georgia_label, georgia] = compile_state_house("Georgia", year_dataset, col_6_x, row_5_col_6, 14, 4, "GA");
    
    // drawing House col 7, states=[michigan, ohio, west virginia, virginia, florida]
    const col_7_row_args = [[1, 0], [2, 4, 1], [3, 8, 2], [4, 9, 3], [5, 12, 4]];
    [col_7_x, row_1_col_7, row_2_col_7, row_3_col_7, row_4_col_7, row_5_col_7] = compile_coordinates(7, col_7_row_args);
    [michigan_data, michigan_label, michigan] = compile_state_house("Michigan", year_dataset, col_7_x, row_1_col_7, 14, 4, "MI");
    [ohio_data, ohio_label, ohio] = compile_state_house("Ohio", year_dataset, col_7_x, row_2_col_7, 16, 4, "OH");
    [west_virginia_data, west_virginia_label, west_virginia] = compile_state_house("West Virginia", year_dataset, col_7_x, row_3_col_7, 3, 4, "WV");
    [virginia_data, virginia_label, virginia] = compile_state_house("Virginia", year_dataset, col_7_x, row_4_col_7, 11, 4, "VA");

    [florida_data, florida_label, florida] = compile_state_house("Florida", year_dataset, col_7_x, row_5_col_7, 27, 7, "FL");

    // drawing House col 8, states=[pennsylvania, north carolina, south carolina]
    const col_8_row_args = [[1, 0], [2, 5, 1], [3, 9, 2]];
    [col_8_x, row_1_col_8, row_2_col_8, row_3_col_8] = compile_coordinates(8, col_8_row_args);
    [pennsylvania_data, pennsylvania_label, pennsylvania] = compile_state_house("Pennsylvania", year_dataset, col_8_x, row_1_col_8, 18, 4, "PA");
    [north_carolina_data, north_carolina_label, north_carolina] = compile_state_house("North Carolina", year_dataset, col_8_x, row_2_col_8, 13, 4, "NC");
    [south_carolina_data, south_carolina_label, south_carolina] = compile_state_house("South Carolina", year_dataset, col_8_x, row_3_col_8, 7, 4, "SC");
    
    // drawing House col 9, states=[vermont, new hampshire, new york, new jersey, maryland]
    const col_9_row_args = [[1, 0], [2, 1, 1], [3, 2, 2], [4, 9, 3], [5, 12, 4]];
    [col_9_x, row_1_col_9, row_2_col_9, row_3_col_9, row_4_col_9, row_5_col_9] = compile_coordinates(9, col_9_row_args);
    [vermont_data, vermont_label, vermont] = compile_state_house("Vermont", year_dataset, col_9_x, row_1_col_9, 1, 4, "VT");
    [new_hampshire_data, new_hampshire_label, new_hampshire] = compile_state_house("New Hampshire", year_dataset, col_9_x, row_2_col_9, 2, 4, "NH");
    [new_york_data, new_york_label, new_york] = compile_state_house("New York", year_dataset, col_9_x, row_3_col_9, 27, 4, "NY");
    [new_jersey_data, new_jersey_label, new_jersey] = compile_state_house("New Jersey", year_dataset, col_9_x, row_4_col_9, 12, 4, "NJ");
    [maryland_data, maryland_label, maryland] = compile_state_house("Maryland", year_dataset, col_9_x, row_5_col_9, 8, 4, "MD");
    
    // drawing House col 10, states=[maine, massachusets, rhode island, connecticut, delaware]
    const col_10_row_args = [[1, 0], [2, 1, 1], [3, 4, 2], [4, 5, 3], [5, 7, 4]];
    [col_10_x, row_1_col_10, row_2_col_10, row_3_col_10, row_4_col_10, row_5_col_10] = compile_coordinates(10, col_10_row_args);
    [maine_data, maine_label, maine] = compile_state_house("Maine", year_dataset, col_10_x, row_1_col_10, 2, 4, "ME");
    [massachusets_data, massachusets_label, massachusets] = compile_state_house("Massachusetts", year_dataset, col_10_x, row_2_col_10, 9, 4, "MA");
    [rhode_island_data, rhode_island_label, rhode_island] = compile_state_house("Rhode Island", year_dataset, col_10_x, row_3_col_10, 2, 4, "RI");
    [connecticut_data, connecticut_label, connecticut] = compile_state_house("Connecticut", year_dataset, col_10_x, row_4_col_10, 5, 4, "CT");
    [delaware_data, delaware_label, delaware] = compile_state_house("Delaware", year_dataset, col_10_x, row_5_col_10, 1, 4, "DE");

}

// House arcs utility variables
const inner_radius = 100;
const outer_radius = 150;

function construct_arc(data, year, chamber, details_dataset) {
    /*
    input:
        data: arc dataset constructed for current chamber using build_arc_dataset fxn
        year: selected year from the input event handle
        chamber: current selected chamber of the congress
        details_dataset: the global congress details dataset
    action:
        constructs the house arcs for the visualization (below the details panel)
    */

    // initializing variables
    let dataset = data;
    let half_label_text = 0;
    let total_chamber_label = 0;
    
    // setting variables based on selected chamber from event handle
    if (chamber == "House") {
        half_label_text = 218;
        total_chamber_label = 435;
    } else if (chamber == "Senate") {
        half_label_text = 50;
        total_chamber_label = 100;
    };

    //setting arc charts
    let arcs = d3.arc()
            .innerRadius(inner_radius)
            .outerRadius(outer_radius);

    //setting rings fxn for pie chart
    let rings = d3.pie()
            .padAngle(0.009)
            .startAngle(-0.5 * Math.PI)
            .endAngle(0.5 * Math.PI);

    // drawing group elements => arcs
    let groups = svg.selectAll("g.arc")
                    .data(rings(dataset))
                    .join("g")
                    .attr("class", "arcs")
                    .attr("transform", "translate(1500, 720)");

    // adding attributes to arcs
    groups.append("path")
            .attr("fill", d => (arc_color(d, details_dataset, year, chamber)))
            .attr("d", arcs);

    //local logging function
    function log(d) {

        console.log(d);

    }

    //setting variables from dataset
    let l1_text = dataset[0];
    let l2_text = dataset[1];
    let l1_x = 1361;
    let l2_x = 1614;

    //setting text and co-ordinates manually for l1 & l2
    if (l1_text < 50 ) {

        l1_text = l1_text + " + 2";
        l1_x = l1_x - 10;

    };

    if (l2_text < 50 ) {

        l2_text = l2_text + " + 2";
        l2_x = l2_x - 10;
    };

    //drawing elements on the viz
    let l1_label = svg.append("text")
                        .attr("x", l1_x)
                        .attr("y", 735)
                        .attr("class", "ArcLabels")
                        .text(l1_text);

    let l2_label = svg.append("text")
                        .attr("x", l2_x)
                        .attr("y", 735)
                        .attr("class", "ArcLabels")
                        .text(l2_text);

    let total_label = svg.append("text")
                        .attr("x", 1463)
                        .attr("y", 710)
                        .attr("class", "ArcTotalLabel")
                        .text(total_chamber_label);

    let partition_line = svg.append("line")
                            .attr("x1", 1500)
                            .attr("y1", 630)
                            .attr("x2", 1500)
                            .attr("y2", 560)
                            .attr("class", "ArcPartitionLine");

    let half_label = svg.append("text")
                        .attr("x", 1488)
                        .attr("y", 555)
                        .attr("class", "ArcHalfLabel")
                        .text(half_label_text);

}

function build_arc_dataset(dataset, year, chamber) {
    /*
    input:
        dataset: congress details dataset (JSON)
        year: selected year from input event handle
        chamber: selected chamber of congress through input event handle
    action:
        extracts the required data from the input dataset, year & chamber
        sets local variables
        arranges the seats data in a list curr_data
    output:
        curr_data: list of seats for each party in the selected chamber
    */
    //TODO: change the function to behave dynamically without micromanaging data

    let chamber_data = dataset[chamber];
    let year_data = chamber_data.filter(d => (d.year == year));
    year_data = year_data[0];
    let l1_data = year_data.leader1;
    let l1_party = l1_data.party;
    let l1_seats = l1_data["seats"];
    let l2_data = year_data.leader2;
    let l2_party = l2_data.party;
    let l2_seats = l2_data["seats"];

    let total = 0;
    
    if (chamber == "House") {
        total = 435;
    } else if (chamber == "Senate") {
        total = 100;
    };

    let l3_seats = total - l1_seats - l2_seats;

    let curr_data = [l1_seats, l2_seats, l3_seats];

    if (chamber == "Senate" && year == 2020) {

        curr_data = [l2_seats, l1_seats, l3_seats];

    }

    return curr_data;

}

function arc_color(d, dataset, year, chamber) {
    /*
    input:
        d: datapoint
        dataset: congress details dataset
        year: selected year through input
        chamber: selected chamber through input
    action:
        identifies the party based on the seats
        returns party color
    output:
        hex code color for the identified party using party_color fxn
    */
    //TODO: cange fxn to work dynamically without micromanaging data

    let value = d.value;
    let chamber_data = dataset[chamber];
    let year_data = chamber_data.filter(d => (d.year == year));
    year_data = year_data[0];
    let l1_data = year_data.leader1;
    let l1_party = l1_data.party;
    let l1_seats = l1_data["seats"];
    let l2_data = year_data.leader2;
    let l2_party = l2_data.party;
    let l2_seats = l2_data["seats"];
    let party = ""

    if (value == l1_seats) {
        party = l1_party
    } else if (value == l2_seats) {
        party = l2_party
    } else {
        party = "Independent"
    }

    return party_color(party);

}

// Chart title
function display_chart_title(chamber, value) {
    /*
    input:
        chamber: name of current selected chamber
        value: curent selected year value
    action:
        displays chart title depending on chamber & selected year values
    */

    //setting local variables
    let chart_text = "United States "
    let x = 0;

    if (chamber == "House") {
        chart_text += "House of Representatives ";
        x = 300;
    } else if (chamber == "Senate") {
        chart_text += "Senate ";
        x = 420;
    }

    chart_text += value;

    //display varibales on viz
    svg.append("text")
        .attr("x", x)
        .attr("y", 60)
        .attr("class", "ChartTitle")
        .text(chart_text);

}

// senate global variables
const xg_s = 30;
const yg_s = 190;
const s_sq_gap_x = 10;
const s_sq_gap_y = 60;
const s_sq_len = 30;
const s_sq_pad = 10;
const margin_x_senate = 40;
const margin_y_senate = 10;
const senate_state_len_x = (2 * s_sq_len) + (s_sq_gap_x);
const senate_state_gap_x = 50;
const senate_state_gap_y = 25;

function construct_senate_seats(cols, dx, dy, dataset, state) {
    /*
    input:
        cols: number of cols to be used in arranging the seats
        dx: starting x co-ordinate
        dy: starting y co-ordinate
        dataset: filtered state dataset
        state: state name as a str
    action:
        constructs senate seats for states vertically
        intialises tooltip events for the constructed seats
    */

    //initializing local variables
    let d_xg = xg_s + dx;
    let d_yg = yg_s + dy;
    let fx = s_sq_len + s_sq_gap_x;
    let fy = s_sq_len + s_sq_gap_y;
    let id = state + "_senate_seat"

    function x_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns xf => the final x coordinate for the seat 
                          for data point at index i from the dataset
        */

        //x val calculation
        let seat_pos_x = i % cols;
        let xf = d_xg + (seat_pos_x * fx);
        return xf

    }

    function y_val(i) {
        /*
        input:
            i: index as a int => index of a sequence from dataset
        action:
            returns yf => the final y coordinate for the seat 
                          for data point at index i from the dataset
        */

        //y val calculation
        let seat_pos_y = Math.floor(i / cols);
        let yf = d_yg + (seat_pos_y * fy);
        return yf

    }

    //drawing arc group elements
    svg.selectAll("g")
        .data(dataset)
        .join("rect")
        .attr("x", (d, i) => (x_val(i)))
        .attr("y", (d, i) => (y_val(i)))
        .attr("width", s_sq_len)
        .attr("height", s_sq_len)
        .attr("class", "SenateSeats")
        .attr("id", d => (id))
        .attr("stroke", "black")
        .attr("fill", d => (seat_color(d)))
        .attr("opacity", d => d.current_cycle == "Yes" ? "100%" : "30%");

    let tooltip = state_tooltips(id, dataset);

}

function col_x_build_senate(col) {
    /*
    input:
        col: col number as an int in which the state belongs to in the visualization
    returns:
        out: the starting x coordinate for drawing the state's senate seats.
    */

    //calculating starting x coordinate
    let factor = col - 1
    const out = margin_x_senate + (factor * senate_state_len_x) + (factor * senate_state_gap_x);
    return out;

}

function state_len_y_senate(y_seat_rows) {
    /*
    input:
        y_seat_rows: number of rows of seats drawn before the states senate seats
    output:
        out: length calculated to input in calculation of the y coordinates 
             for drawing new states senate seats
    */

    //calculating length
    const out = (y_seat_rows * s_sq_len) + ((y_seat_rows - 1) * s_sq_gap_y);
    return out;

}

function row_y_build_senate(row, y_seat_rows, number_states_y = 1) {
    /*
    input:
        row: current row as an int for the current states in current col
        y_seat_rows: number of rows of seats drawn before the states seats
        number_states_y: default set to 1; number of states on the above the current state in the same col
                         the first state is deafulted as 1
    output:
        out: the starting y coordinate for the current state to draw the senate seats.
    */

    //calculating starting y coordinate
    let factor = row - 1;
    let state_len = state_len_y_senate(y_seat_rows);
    const out = margin_y_senate + (state_len) + (factor * senate_state_gap_y);
    return out;

}

function state_labels_senate(state, x, y) {
    /*
    input:
        state: state name as str
        x: starting x coordinate
        y: starting y coordinate
    action:
        writes(draws) the input state's name
    */

    //initialising local coordinates
    let fx = xg_s + x;
    let fy = yg_s + y - 5;

    //drawing label
    svg.append("text")
        .attr("x", fx)
        .attr("y", fy)
        .attr("class", "SenateStateLabels")
        .text(state);

}

function compile_coordinates_senate(col, rows_args) {
    /*
    input:
        col: current column number for the coordinates to be compiled
        rows_args: list of list containing the 
                   inputs (row, y_seat_rows, number_states_y) for calculating dy
                   for the states to be drawn
    action:
        creates a list of output coordinates conatining the dx & dy for all the inputs
        in the format [dx, ...dy]
    output:
        out_list: coordinate list for the (to be drawn)states corresponding to the row_args
                  in the format [dx, ...dy]
    */

    //building out_list
    const col_x = col_x_build_senate(col);
    let out_list = [col_x];

    for (let i = 0; i < rows_args.length; i++) {

        let arg = rows_args[i];

        // log(arg.length);

        if (arg.length == 2) {
            let row = arg[0];
            let y_seat_rows = arg[1];
            let dy = row_y_build_senate(row, y_seat_rows);
            out_list.push(dy);
        }

        if (arg.length == 3) {
            let row = arg[0];
            let y_seat_rows = arg[1];
            let number_states_y = arg[2];
            let dy = row_y_build_senate(row, y_seat_rows, number_states_y);
            out_list.push(dy);
        }
    }
    // console.log(out_list);
    return out_list;

}

function compile_state_senate(state_name, year_dataset, dx, dy, cols, state_ini) {
    /*
    input:
        state_name: name of the state as a str
        year_dataset: dataset filtered by year
        dx: starting x coordinate
        dy: starting y coordinate
        cols: number of cols in the alignment as a int
        state_ini: state initials (all caps) as a str
    action:
        data: creates a dataset with filtered data for the input state
        state_label: creates the state label
        state: creates the state var with state senate seats drawn
    output:
        returns a list of the variables created in action
    */

    let data = filter_state(state_name, year_dataset);
    const state_label = state_labels_senate(state_name, dx, dy);
    let state = construct_senate_seats(cols, dx, dy, data, state_ini);
    return [data, state_label, state]
}

function display_senate_seats(year_dataset) {
    /*
    input:
        year_dataset: dataset filtered for the selected year
    action:
        sets the row args for all the states in the sequence of visualization columns
        gets the coordinates for all states using compile_coordinates_senate fxn
        draws the seats of senate for all the states in the same sequence using compile_state_senate fxn
    */

    const col_row_args = [[1, 0], [2, 1, 1], [3, 2, 2], [4, 3, 3], [5, 4, 4]];
    
    // Drawing Senate Col 1, states=[washington, oregon, nevada, arizona, california]
    [col_1_x, row_1_col_1, row_2_col_1, row_3_col_1, row_4_col_1, row_5_col_1] = compile_coordinates_senate(1, col_row_args);
    [washington_data, washington_label, washington] = compile_state_senate("Washington", year_dataset, col_1_x, row_1_col_1, 2, "WA");
    [oregon_data, oregon_label, oregon] = compile_state_senate("Oregon", year_dataset, col_1_x, row_2_col_1, 2, "OR");
    [nevada_data, nevada_label, nevada] = compile_state_senate("Nevada", year_dataset, col_1_x, row_3_col_1, 2, "NV");
    [arizona_data, arizona_label, arizona] = compile_state_senate("Arizona", year_dataset, col_1_x, row_4_col_1, 2, "AZ");
    [california_data, california_label, california] = compile_state_senate("California", year_dataset, col_1_x, row_5_col_1, 2, "CA");

    // Drawing Senate Col 2, states=[idaho, utah, colorado, new mexico, alaska]
    [col_2_x, row_1_col_2, row_2_col_2, row_3_col_2, row_4_col_2, row_5_col_2] = compile_coordinates_senate(2, col_row_args);
    [idaho_data, idaho_label, idaho] = compile_state_senate("Idaho", year_dataset, col_2_x, row_1_col_2, 2, "ID");
    [utah_data, utah_label, utah] = compile_state_senate("Utah", year_dataset, col_2_x, row_2_col_2, 2, "UT");
    [colorado_data, colorado_label, colorado] = compile_state_senate("Colorado", year_dataset, col_2_x, row_3_col_2, 2, "CO");
    [new_mexico_data, new_mexico_label, new_mexico] = compile_state_senate("New Mexico", year_dataset, col_2_x, row_4_col_2, 2, "NM");
    [alaska_data, alaska_label, alaska] = compile_state_senate("Alaska", year_dataset, col_2_x, row_5_col_2, 2, "AK");

    // Drawing Senate Col 3, states=[montana, wyoming, nebraska, kansas, hawaii]
    [col_3_x, row_1_col_3, row_2_col_3, row_3_col_3, row_4_col_3, row_5_col_3] = compile_coordinates_senate(3, col_row_args);
    [montana_data, montana_label, montana] = compile_state_senate("Montana", year_dataset, col_3_x, row_1_col_3, 2, "MT");
    [wyoming_data, wyoming_label, wyoming] = compile_state_senate("Wyoming", year_dataset, col_3_x, row_2_col_3, 2, "WY");
    [nebraska_data, nebraska_label, nebraska] = compile_state_senate("Nebraska", year_dataset, col_3_x, row_3_col_3, 2, "NE");
    [kansas_data, kansas_label, kansas] = compile_state_senate("Kansas", year_dataset, col_3_x, row_4_col_3, 2, "KS");
    [hawaii_data, hawaii_label, hawaii] = compile_state_senate("Hawaii", year_dataset, col_3_x, row_5_col_3, 2, "HI");

    // Drawing Senate Col 4, states=[north dacota, south dacota, missouri, arkansas, texas]
    [col_4_x, row_1_col_4, row_2_col_4, row_3_col_4, row_4_col_4, row_5_col_4] = compile_coordinates_senate(4, col_row_args);
    [north_dacota_data, north_dacota_label, north_dacota] = compile_state_senate("North Dakota", year_dataset, col_4_x, row_1_col_4, 2, "ND");
    [south_dacota_data, south_dacota_label, south_dacota] = compile_state_senate("South Dakota", year_dataset, col_4_x, row_2_col_4, 2, "SD");
    [missouri_data, missouri_label, missouri] = compile_state_senate("Missouri", year_dataset, col_4_x, row_3_col_4, 2, "MO");
    [arkansas_data, arkansas_label, arkansas] = compile_state_senate("Arkansas", year_dataset, col_4_x, row_4_col_4, 2, "AR");
    [texas_data, texas_label, texas] = compile_state_senate("Texas", year_dataset, col_4_x, row_5_col_4, 2, "TX");

    // Drawing Senate Col 5, states=[minnesota, iowa, kentucky, mississippi, oklahoma]
    [col_5_x, row_1_col_5, row_2_col_5, row_3_col_5, row_4_col_5, row_5_col_5] = compile_coordinates_senate(5, col_row_args);
    [minnesota_data, minnesota_label, minnesota] = compile_state_senate("Minnesota", year_dataset, col_5_x, row_1_col_5, 2, "MN");
    [iowa_data, iowa_label, iowa] = compile_state_senate("Iowa", year_dataset, col_5_x, row_2_col_5, 2, "IA");
    [kentucky_data, kentucky_label, kentucky] = compile_state_senate("Kentucky", year_dataset, col_5_x, row_3_col_5, 2, "KY");
    [mississippi_data, mississippi_label, mississippi] = compile_state_senate("Mississippi", year_dataset, col_5_x, row_4_col_5, 2, "MS");
    [oklahoma_data, oklahoma_label, oklahoma] = compile_state_senate("Oklahoma", year_dataset, col_5_x, row_5_col_5, 2, "OK");

    // Drawing Senate Col 6, states=[wisconsin, illinois, tennessee, alabama, louisiana]
    [col_6_x, row_1_col_6, row_2_col_6, row_3_col_6, row_4_col_6, row_5_col_6] = compile_coordinates_senate(6, col_row_args);
    [wisconsin_data, wisconsin_label, wisconsin] = compile_state_senate("Wisconsin", year_dataset, col_6_x, row_1_col_6, 2, "WI");
    [illinois_data, illinois_label, illinois] = compile_state_senate("Illinois", year_dataset, col_6_x, row_2_col_6, 2, "IL");
    [tennessee_data, tennessee_label, tennessee] = compile_state_senate("Tennessee", year_dataset, col_6_x, row_3_col_6, 2, "TN");
    [alabama_data, alabama_label, alabama] = compile_state_senate("Alabama", year_dataset, col_6_x, row_4_col_6, 2, "AL");
    [louisiana_data, louisiana_label, louisiana] = compile_state_senate("Louisiana", year_dataset, col_6_x, row_5_col_6, 2, "LA");

    // Drawing Senate Col 7, states=[michigan, indiana, south carolina, georgia, florida]
    [col_7_x, row_1_col_7, row_2_col_7, row_3_col_7, row_4_col_7, row_5_col_7] = compile_coordinates_senate(7, col_row_args);
    [michigan_data, michigan_label, michigan] = compile_state_senate("Michigan", year_dataset, col_7_x, row_1_col_7, 2, "MI");
    [indiana_data, indiana_label, indiana] = compile_state_senate("Indiana", year_dataset, col_7_x, row_2_col_7, 2, "IN");
    [south_carolina_data, south_carolina_label, south_carolina] = compile_state_senate("South Carolina", year_dataset, col_7_x, row_3_col_7, 2, "SC");
    [georgia_data, georgia_label, georgia] = compile_state_senate("Georgia", year_dataset, col_7_x, row_4_col_7, 2, "GA");
    [florida_data, florida_label, florida] = compile_state_senate("Florida", year_dataset, col_7_x, row_5_col_7, 2, "FL");

    // Drawing Senate Col 8, states=[ohio, north carolina, west virginia, virginia, maryland]
    [col_8_x, row_1_col_8, row_2_col_8, row_3_col_8, row_4_col_8, row_5_col_8] = compile_coordinates_senate(8, col_row_args);
    [ohio_data, ohio_label, ohio] = compile_state_senate("Ohio", year_dataset, col_8_x, row_1_col_8, 2, "OH");
    [north_carolina_data, north_carolina_label, north_carolina] = compile_state_senate("North Carolina", year_dataset, col_8_x, row_2_col_8, 2, "NC");
    [west_virginia_data, west_virginia_label, west_virginia] = compile_state_senate("West Virginia", year_dataset, col_8_x, row_3_col_8, 2, "WV");
    [virginia_data, virginia_label, virginia] = compile_state_senate("Virginia", year_dataset, col_8_x, row_4_col_8, 2, "VA");
    [maryland_data, maryland_label, maryland] = compile_state_senate("Maryland", year_dataset, col_8_x, row_5_col_8, 2, "MD");

    // Drawing Senate Col 9, states=[vermont, new hampshire, pennsylvania, new jersey, delaware]
    [col_9_x, row_1_col_9, row_2_col_9, row_3_col_9, row_4_col_9, row_5_col_9] = compile_coordinates_senate(9, col_row_args);
    [vermont_data, vermont_label, vermont] = compile_state_senate("Vermont", year_dataset, col_9_x, row_1_col_9, 2, "VT");
    [new_hampshire_data, new_hampshire_label, new_hampshire] = compile_state_senate("New Hampshire", year_dataset, col_9_x, row_2_col_9, 2, "NH");
    [pennsylvania_data, pennsylvania_label, pennsylvania] = compile_state_senate("Pennsylvania", year_dataset, col_9_x, row_3_col_9, 2, "PA");
    [new_jersey_data, new_jersey_label, new_jersey] = compile_state_senate("New Jersey", year_dataset, col_9_x, row_4_col_9, 2, "NJ");
    [delaware_data, delaware_label, delaware] = compile_state_senate("Delaware", year_dataset, col_9_x, row_5_col_9, 2, "DE");

    // Drawing Senate Col 10, states=[maine, massachusets, rhode island, connecticut, new york]
    [col_10_x, row_1_col_10, row_2_col_10, row_3_col_10, row_4_col_10, row_5_col_10] = compile_coordinates_senate(10, col_row_args);
    [maine_data, maine_label, maine] = compile_state_senate("Maine", year_dataset, col_10_x, row_1_col_10, 2, "ME");
    [massachusets_data, massachusets_label, massachusets] = compile_state_senate("Massachusetts", year_dataset, col_10_x, row_2_col_10, 2, "MA");
    [rhode_island_data, rhode_island_label, rhode_island] = compile_state_senate("Rhode Island", year_dataset, col_10_x, row_3_col_10, 2, "RI");
    [connecticut_data, connecticut_label, connecticut] = compile_state_senate("Connecticut", year_dataset, col_10_x, row_4_col_10, 2, "CT");
    [new_york_data, new_york_label, new_york] = compile_state_senate("New York", year_dataset, col_10_x, row_5_col_10, 2, "NY");

}

//NOTE: Depretiated feature module for grid view for the visualization
// grid collapse house
const xg_grid = 10;
const yg_grid = 100;
const sq_gap_x_grid = 25;
const sq_gap_y_grid = 15;
const sq_len_grid = 30;

function construct_house_grid(cols, dx, dy) {
    //placeholder fxn for house grid view
    //TODO: Implement this feature

    let d_xg = xg + dx;
    let d_yg = yg + dy;

    for (let num = 0; num < 435; num++) {

        let seat_pos_x = num % cols;
        let fx = sq_len_grid + sq_gap_x_grid;
        let xf = d_xg + (seat_pos_x * fx);
        let seat_pos_y = Math.floor(num / cols);
        let fy = sq_len_grid + sq_gap_y_grid;
        let yf = d_yg + (seat_pos_y * fy);

        svg.append("rect")
            .attr("class", "rects")
            .attr("x", xf)
            .attr("y", yf)
            .attr("width", sq_len_grid)
            .attr("height", sq_len_grid)
            .attr("stroke", "black")
            .attr("opacity", "60%")
            .attr("fill", "gray");

    }

}

function display_house_grid(cols, dx, dy) {
    //place holder fxn for house grid feature
    //TODO: implement feature

    const grid_house = construct_house_grid(cols, dx, dy);
    return grid_house;

}

// grid collapse senate
const xg_grid_s = 10;
const yg_grid_s = 100;
const s_sq_gap_x_grid = 50;
const s_sq_gap_y_grid = 25;
const s_sq_len_grid = 50;

function construct_senate_grid(cols, dx, dy) {
    //placeholder fxn for senate grid view
    //TODO: Implement this feature

    let d_xg = xg + dx;
    let d_yg = yg + dy;

    for (let num = 0; num < 100; num++) {

        let seat_pos_x = num % cols;
        let fx = s_sq_len_grid + s_sq_gap_x_grid;
        let xf = d_xg + (seat_pos_x * fx);
        let seat_pos_y = Math.floor(num / cols);
        let fy = s_sq_len_grid + s_sq_gap_y_grid;
        let yf = d_yg + (seat_pos_y * fy);

        svg.append("rect")
            .attr("class", "rects")
            .attr("x", xf)
            .attr("y", yf)
            .attr("width", s_sq_len_grid)
            .attr("height", s_sq_len_grid)
            .attr("stroke", "black")
            .attr("opacity", "60%")
            .attr("fill", "gray");

    }

}

function display_senate_grid(cols, dx, dy) {
    //place holder fxn for senate grid feature
    //TODO: implement feature

    const grid_senate = construct_senate_grid(cols, dx, dy);
    return grid_senate;

}

//NOTE: End of depretiated grid view feature

//loading dataset
Promise.all([
    d3.csv("data/Data Collection House  - 2014 - 2020.csv"),
    d3.csv("data/Data Collection Senate - 2014 - 2020.csv"),
    d3.json("data/CongressDetails.JSON")
]).then(function(files){

    //dataset variables assignment
    const US_House = files[0].map(d => {return {"year" : +d["Year"], "state" : d.State, "district" : +d.District, "representative" : d.Representative, "party" : d.Party}});
    const US_Senate = files[1].map(d => {return {"year" : +d["Year"], "state" : d.State, "district" : +d.District, "class" : +d.Class, "representative" : d.Representative, "party" : d.Party, "current_cycle" : d["Current Cycle"], "special" : d["Special"]}});
    const US_Congress_Details = files[2];

    /*
    initializing the data vis in default state on load
    default state chamber: House
    default state year: 2014
    */
    
    /*
    MAIN VIZUALIZATION FLOW
    */

    //setting initial variables
    let curr_US_House = US_House.filter(d => (d.year == 2014));

    let curr_US_Senate = US_Senate.filter(d => (d.year == 2014));

    let curr_data = curr_US_House;

    let curr_chamber = "House"

    chamber_selection(curr_chamber);

    let curr_year = 2014;

    //starting setting up the visualization
    congress_logo("data/images/Congress_Seal.png");

    chamber_logo("data/images/House.png");

    let house = display_house_seats(curr_US_House);

    let house_arc_data = build_arc_dataset(US_Congress_Details, 2014, "House");

    let house_arc = construct_arc(house_arc_data, 2014, "House", US_Congress_Details);

    details_panel();

    let details = details_text(US_Congress_Details, "House", 2014);

    major_events(US_Congress_Details, curr_year)

    let chart_title = display_chart_title("House", 2014);
    
    display_presidents(curr_year);

    function update_data_slider(curr_year) {
        /*
        input:
            curr_year: year chosen through slider input
        action:
            sets the current house & senate data based on the input
        */

        curr_US_House = US_House.filter(d => (d.year == curr_year));

        curr_US_Senate = US_Senate.filter(d => (d.year == curr_year));

    }

    function update_chart(curr_year) {
        //function to update the viz based on the year on slider
        /*
        input:
            curr_year: year chosen through slider input
        action:
            Updates the visualization based on the chosen year
        */

        // removing rendered elements
        svg.selectAll("g")
            .remove();

        svg.selectAll("rect")
            .remove();

        svg.selectAll("text")
            .remove();

        // chart update based on current selected chamber from event handles
        if (curr_chamber == "House") {

            congress_logo('data/images/Congress_Seal.png');

            chamber_logo('data/images/House.png');

            house = display_house_seats(curr_US_House);

            house_arc_data = build_arc_dataset(US_Congress_Details, curr_year, "House");
    
            house_arc = construct_arc(house_arc_data, curr_year, "House", US_Congress_Details);

            details_panel();
    
            details = details_text(US_Congress_Details, "House", curr_year);
    
            major_events(US_Congress_Details, curr_year);
    
            chart_title = display_chart_title("House", curr_year);
    
            display_presidents(curr_year);

        } else if (curr_chamber == "Senate") {

            congress_logo('data/images/Congress_Seal.png');

            chamber_logo('data/images/Senate.png');
            
            senate = display_senate_seats(curr_US_Senate);

            senate_arc_data = build_arc_dataset(US_Congress_Details, curr_year, "Senate");

            senate_arc = construct_arc(senate_arc_data, curr_year, "Senate", US_Congress_Details);

            details_panel();

            details = details_text(US_Congress_Details, "Senate", curr_year);

            major_events(US_Congress_Details, curr_year);

            chart_title = display_chart_title("Senate", curr_year);

            display_presidents(curr_year);

        }

    }

    function chamber_selection(chamber) {
        /*
        input:
            chamber: selected current chamber through input button
        action:
            sets the css styles for the selected chamber button
        */

        if (chamber == "House") {

            $("#House").css("border", "0.05em solid #E81B23"); //border with red shade for house button
            $("#House").css("color", "#333333"); //black text color for house button
            $("#Senate").css("border", "none"); //no border for senate button
            $("#Senate").css("color", "white"); //white text color for senate button

        } else if (chamber == "Senate") {

            $("#Senate").css("border", "0.05em solid #E81B23"); //border with red shade for senate button
            $("#Senate").css("color", "#333333"); //black text color for senate button
            $("#House").css("border", "none"); //no border for house button
            $("#House").css("color", "white"); //white text color for house button

        }

    }

    //event listeners for viz
    d3.select("input")
        .on("change", (event, d) => {
        //event listener for the year slider
        
        currYear = event.currentTarget.value;
        curr_year = currYear;
        update_data_slider(currYear);
        update_chart(currYear);

    })

    d3.select("#House")
        .on("click", (event, d) => {
        //event listener for the House button
            curr_chamber = "House";
            update_chart(curr_year);
            chamber_selection(curr_chamber);

    })

    d3.select("#Senate")
        .on("click", (event, d) => {
        //event listener for the Senate button

            curr_chamber = "Senate";
            update_chart(curr_year);
            chamber_selection(curr_chamber);

    })

})
