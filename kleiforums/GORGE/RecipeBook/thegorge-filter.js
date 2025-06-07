// wait Until Loading Complete
function GorgeFilterDishes() {
    let options = {
        discovered_dishes: discovered_dishes,
        dishDisplayModeDefault: "dish-display-mode-opacity"
    };
    main(options);

    // Add credits! Thank you all!
}

// this is the code which will be injected into a given page...
function main(options) {
    // options
    let dishDisplayModeDefault = options.dishDisplayModeDefault;
    let discovered_dishes = options.discovered_dishes;
    // translate
    //let translateToUserLanguage = text => browser.i18n.getMessage(text);
    //let t = translateToUserLanguage;

    /////////////////////////////////////////////

    const stations = ["pot", "oven", "grill"];
    let btn_station_div = $('<div/>', {
        class: 'btn_station_div'
    });
    for (let station of stations) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', station);
        label.innerText = loc_string(station);
        let checkbox = document.createElement("input");
        checkbox.setAttribute('id', station);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('class', 'invisible');
        checkbox.classList.add('station_btn');
        btn_station_div.append(checkbox);
        btn_station_div.append(label);
    }

    const categories = [
        "all", "snack", "bread", "veggie", "soup",
        "fish", "meat", "cheese", "pasta", "sweet"
    ];
    let btn_cat_div = $('<div/>', {
        class: 'btn_cat_div'
    });
    for (let category of categories) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', category);
        label.innerText = loc_string(category);
        let radio = document.createElement("input");
        radio.setAttribute('id', category);
        radio.setAttribute('type', 'radio');
        radio.setAttribute('class', 'invisible');
        radio.classList.add('cat_btn');
        radio.setAttribute('name', 'category');
        if (category == 'all') radio.checked = true; // default
        btn_cat_div.append(radio);
        btn_cat_div.append(label);
    }

    const coinTypes = ["copper", "silver", "gold", "diamond"];
    
    // Offering filter (based on "coins")
    let btn_offering_div = $('<div/>', {
        class: 'btn_offering_div'
    });
    let offeringTitle = document.createElement("span");
    offeringTitle.innerText = "Offering: ";
    offeringTitle.style.fontWeight = "bold";
    btn_offering_div.append(offeringTitle);
    
    for (let coin of coinTypes) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', 'offering_' + coin);
        label.innerText = coin.charAt(0).toUpperCase() + coin.slice(1);
        let checkbox = document.createElement("input");
        checkbox.setAttribute('id', 'offering_' + coin);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('class', 'invisible');
        checkbox.classList.add('offering_btn');
        btn_offering_div.append(checkbox);
        btn_offering_div.append(label);
    }

    // Silver Offering filter (based on "silver_coins")
    let btn_silver_offering_div = $('<div/>', {
        class: 'btn_silver_offering_div'
    });
    let silverOfferingTitle = document.createElement("span");
    silverOfferingTitle.innerText = "Silver Offering: ";
    silverOfferingTitle.style.fontWeight = "bold";
    btn_silver_offering_div.append(silverOfferingTitle);
    
    for (let coin of coinTypes) {
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', 'silver_offering_' + coin);
        label.innerText = coin.charAt(0).toUpperCase() + coin.slice(1);
        let checkbox = document.createElement("input");
        checkbox.setAttribute('id', 'silver_offering_' + coin);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('class', 'invisible');
        checkbox.classList.add('silver_offering_btn');
        btn_silver_offering_div.append(checkbox);
        btn_silver_offering_div.append(label);
    }

    // Group category and station filters
    let category_station_container = $('<div/>', {
        class: 'category-station-container'
    });
    category_station_container.append(btn_cat_div);
    category_station_container.append(btn_station_div);

    // Group offering filters
    let offering_container = $('<div/>', {
        class: 'offering-container'
    });
    offering_container.append(btn_offering_div);
    offering_container.append(btn_silver_offering_div);

    let div_all_btns = $('<div id="filter-button"/>');
    div_all_btns.append(category_station_container);
    div_all_btns.append(offering_container);
    $('.recipelist').prepend(div_all_btns);

    ////////////////////////////////////////////

    // no br element
    // $('.recipelist-dishes > br').remove(); // the br is necessary to show two rows on mobile

    //
    let lastClickDish = 0;
    let lastHighLight = 0;

    let dishElement = $('.recipelist-dishes > li');

    let currentCategory = 'all';
    let currentStationStatus = {
        pot: false,
        oven: false,
        grill: false
    }
    let currentOfferingStatus = {
        copper: false,
        silver: false,
        gold: false,
        diamond: false
    }
    let currentSilverOfferingStatus = {
        copper: false,
        silver: false,
        gold: false,
        diamond: false
    }
    $('.station_btn').on('change', e => {
        currentStationStatus[e.target.id] = e.target.checked;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.cat_btn').on('change', e => {
        currentCategory = e.target.id;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.offering_btn').on('change', e => {
        let coinType = e.target.id.replace('offering_', '');
        currentOfferingStatus[coinType] = e.target.checked;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.silver_offering_btn').on('change', e => {
        let coinType = e.target.id.replace('silver_offering_', '');
        currentSilverOfferingStatus[coinType] = e.target.checked;
        highlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });

    $('.recipelist-dishes > li,\
	.recipelist-dishes > li > icon-container > *').click(e => {
        let index = Number.parseInt(e.target.getAttribute("dish") ||
            e.target.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.parentElement
            .getAttribute("dish")) - 1;
        if (!isNaN(index)) {
            if (dishElement.eq(index).hasClass('lowpoint'))
                return;
            dishElement.eq(lastHighLight).removeClass('selected');
            dishElement.eq(index).addClass('selected');
            SelectDish(dishElement[index]);
            lastHighLight = lastClickDish = index;
        }
    });
    $('.recipelist-dishes > li,\
	.recipelist-dishes > li > icon-container > *').hover(e => {
        let index = Number.parseInt(e.target.getAttribute("dish") ||
            e.target.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.getAttribute("dish") ||
            e.target.parentElement.parentElement.parentElement
            .getAttribute("dish")) - 1;
        if (!isNaN(index)) {
            if (dishElement.eq(index).hasClass('lowpoint'))
                return;
            dishElement.eq(lastHighLight).removeClass('selected');
            dishElement.eq(index).addClass('selected');
            lastHighLight = index;
            SelectDish(dishElement[index]);
        }
    }, e => {
        dishElement.eq(lastHighLight).removeClass('selected');
        dishElement.eq(lastClickDish).addClass('selected');
        lastHighLight = lastClickDish;
        SelectDish(dishElement[lastClickDish]);
    });

    // default
    dishElement[lastClickDish].childNodes[0].click();

    function highlight() {
        for (let id = 1; id <= 70; ++id) {
            let dish = $(".recipelist-dishes .dish[data-index=" + id + "]");
            
            let currentStationAll = !currentStationStatus.pot &&
                !currentStationStatus.oven && !currentStationStatus.grill;
            
            let currentOfferingAll = !currentOfferingStatus.copper &&
                !currentOfferingStatus.silver && !currentOfferingStatus.gold && !currentOfferingStatus.diamond;
            
            let currentSilverOfferingAll = !currentSilverOfferingStatus.copper &&
                !currentSilverOfferingStatus.silver && !currentSilverOfferingStatus.gold && !currentSilverOfferingStatus.diamond;

            // Check offering filter (coins)
            let offeringMatch = currentOfferingAll;
            if (!currentOfferingAll && discovered_dishes[id] && discovered_dishes[id].coins) {
                offeringMatch = false;
                let coins = discovered_dishes[id].coins;
                if (currentOfferingStatus.copper && coins[0] > 0) offeringMatch = true;
                if (currentOfferingStatus.silver && coins[1] > 0) offeringMatch = true;
                if (currentOfferingStatus.gold && coins[2] > 0) offeringMatch = true;
                if (currentOfferingStatus.diamond && coins[3] > 0) offeringMatch = true;
            }

            // Check silver offering filter (silver_coins)
            let silverOfferingMatch = currentSilverOfferingAll;
            if (!currentSilverOfferingAll && discovered_dishes[id] && discovered_dishes[id].silver_coins) {
                silverOfferingMatch = false;
                let silverCoins = discovered_dishes[id].silver_coins;
                if (currentSilverOfferingStatus.copper && silverCoins[0] > 0) silverOfferingMatch = true;
                if (currentSilverOfferingStatus.silver && silverCoins[1] > 0) silverOfferingMatch = true;
                if (currentSilverOfferingStatus.gold && silverCoins[2] > 0) silverOfferingMatch = true;
                if (currentSilverOfferingStatus.diamond && silverCoins[3] > 0) silverOfferingMatch = true;
            }

            // normal dish
            let needHighlight = (
                    (discovered_dishes[id].cravings != null && (currentCategory == 'all' || discovered_dishes[id].cravings.indexOf(currentCategory) != -1))
                    &&
                    (currentStationAll || discovered_dishes[id].station.some(dishStations => currentStationStatus[dishStations]))
                    &&
                    offeringMatch
                    &&
                    silverOfferingMatch)
                // dish 70
                ||
                (discovered_dishes[id].cravings == null && currentStationAll && currentCategory == 'all' && offeringMatch && silverOfferingMatch);

            if (dishDisplayModeDefault) {
                if (needHighlight)
                    $(dish).removeClass('lowpoint').removeClass('translucent');
                else $(dish).addClass('lowpoint').addClass('translucent');
            } else {
                if (needHighlight)
                    $(dish).removeClass('lowpoint').removeClass('invisible');
                else $(dish).addClass('lowpoint').addClass('invisible');
            }
        }
    }
}
