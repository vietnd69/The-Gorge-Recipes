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

    // Biến theo dõi trạng thái hover
    let isHovering = false;
    let currentHoverIndex = -1;

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
    
    for (let i = 0; i < coinTypes.length; i++) {
        let coin = coinTypes[i];
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', 'offering_' + coin);
        
        let img = document.createElement("img");
        img.src = "kleiforums/GORGE/RecipeBook/images/quagmire_coin" + (i + 1) + ".png";
        img.alt = coin.charAt(0).toUpperCase() + coin.slice(1);
        img.style.width = "20px";
        img.style.height = "20px";
        img.style.marginRight = "5px";
        
        label.appendChild(img);
        label.appendChild(document.createTextNode(coin.charAt(0).toUpperCase() + coin.slice(1)));
        
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
    silverOfferingTitle.innerText = "Silver Dish Offering: ";
    silverOfferingTitle.style.fontWeight = "bold";
    btn_silver_offering_div.append(silverOfferingTitle);
    
    for (let i = 0; i < coinTypes.length; i++) {
        let coin = coinTypes[i];
        let label = document.createElement("label");
        label.setAttribute('class', "button");
        label.setAttribute('for', 'silver_offering_' + coin);
        
        let img = document.createElement("img");
        img.src = "kleiforums/GORGE/RecipeBook/images/quagmire_coin" + (i + 1) + ".png";
        img.alt = coin.charAt(0).toUpperCase() + coin.slice(1);
        img.style.width = "20px";
        img.style.height = "20px";
        img.style.marginRight = "5px";
        
        label.appendChild(img);
        label.appendChild(document.createTextNode(coin.charAt(0).toUpperCase() + coin.slice(1)));
        
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

    // Group category, station and offering filters
    let filter_container = $('<div/>', {
        class: 'filter-container'
    });
    filter_container.append(category_station_container);
    filter_container.append(offering_container);

    // Sort controls
    let btn_sort_div = $('<div/>', {
        class: 'btn_sort_div'
    });
    let sortTitle = document.createElement("span");
    sortTitle.innerText = "Sort by: ";
    sortTitle.style.fontWeight = "bold";
    btn_sort_div.append(sortTitle);
    
    // Create select dropdown wrapper for sorting
    let sortSelectWrapper = document.createElement("div");
    sortSelectWrapper.classList.add('sort_select_wrapper');
    
    let sortSelect = document.createElement("select");
    sortSelect.setAttribute('id', 'sort_select');
    sortSelect.classList.add('sort_select');
    
    // Add options to select
    const sortOptions = [
        { value: 'dish_number', label: 'Dish No.' },
        { value: 'offering_copper', label: 'Offering Copper' },
        { value: 'offering_silver', label: 'Offering Silver' },
        { value: 'offering_gold', label: 'Offering Gold' },
        { value: 'offering_diamond', label: 'Offering Diamond' },
        { value: 'silver_offering_copper', label: 'Silver Dish Copper' },
        { value: 'silver_offering_silver', label: 'Silver Dish Silver' },
        { value: 'silver_offering_gold', label: 'Silver Dish Gold' },
        { value: 'silver_offering_diamond', label: 'Silver Dish Diamond' }
    ];
    
    for (let option of sortOptions) {
        let optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.innerText = option.label;
        if (option.value === 'dish_number') {
            optionElement.selected = true; // default
        }
        sortSelect.appendChild(optionElement);
    }
    
    sortSelectWrapper.appendChild(sortSelect);
    btn_sort_div.append(sortSelectWrapper);
    
    // Add focus event handlers for icon color changes
    sortSelect.addEventListener('focus', function() {
        sortSelectWrapper.classList.add('focus');
    });
    
    sortSelect.addEventListener('blur', function() {
        sortSelectWrapper.classList.remove('focus');
    });

    // Group sort controls
    let sort_container = $('<div/>', {
        class: 'sort-container'
    });
    sort_container.append(btn_sort_div);

    let div_all_btns = $('<div id="filter-button"/>');
    div_all_btns.append(filter_container);
    div_all_btns.append(sort_container);
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
    let currentSortOrder = 'dish_number'; // 'dish_number', 'offering_copper', 'offering_silver', etc.
    $('.station_btn').on('change', e => {
        currentStationStatus[e.target.id] = e.target.checked;
        sortAndHighlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.cat_btn').on('change', e => {
        currentCategory = e.target.id;
        sortAndHighlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.offering_btn').on('change', e => {
        let coinType = e.target.id.replace('offering_', '');
        currentOfferingStatus[coinType] = e.target.checked;
        sortAndHighlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.silver_offering_btn').on('change', e => {
        let coinType = e.target.id.replace('silver_offering_', '');
        currentSilverOfferingStatus[coinType] = e.target.checked;
        sortAndHighlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });
    $('.sort_select').on('change', e => {
        currentSortOrder = e.target.value;
        sortAndHighlight();
        // relocateClickDish
        if (dishElement.eq(lastClickDish).hasClass('lowpoint'))
            $('.recipelist-dishes > li:not(.lowpoint)').first()[0].click();
    });

    // Thêm throttle function để giới hạn tần suất gọi hàm khi scroll
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
    
    // Biến để kiểm soát scroll
    let isScrolling = false;
    
    // Giảm số lần recalculate style và reflow khi cuộn
    function optimizeForScroll() {
        // Thêm class để giảm animation và hiệu ứng khi scroll
        $(document.body).addClass('is-scrolling');
        
        isScrolling = true;
        
        // Dừng bất kỳ animation nào đang chạy
        $('.recipelist-dishes > li').stop(true, true);
        
        // Clear timeout trước đó
        clearTimeout(window.scrollEndTimer);
        
        // Đặt lại timer để kiểm tra khi nào scroll kết thúc
        window.scrollEndTimer = setTimeout(() => {
            isScrolling = false;
            $(document.body).removeClass('is-scrolling');
        }, 100);
    }
    
    // Đăng ký event listener cho scroll
    $(window).on('scroll', throttle(optimizeForScroll, 100));
    
    // Tối ưu hover khi đang scroll
    function setupHoverEvents() {
        // Hủy tất cả event handlers cũ để tránh trùng lặp khi rerender
        $('.recipelist-dishes > li, .recipelist-dishes > li .icon-container > *').off('mouseenter mouseleave');
        
        // Tối ưu hóa việc hiển thị thông tin món ăn
        function showDishInfo(index, element) {
            if (index === currentHoverIndex || index < 0) return;
            
            // Lưu index hiện tại
            currentHoverIndex = index;
            
            // Tránh thao tác DOM nếu đang scroll
            if (isScrolling) return;
            
            // Chỉ xóa class hover-selected cho tất cả, sau đó thêm vào phần tử hiện tại
            dishElement.removeClass('hover-selected');
            
            if (index >= 0) {
                // Sử dụng element trực tiếp nếu được cung cấp
                if (element) {
                    $(element).addClass('hover-selected');
                    SelectDish(element);
                } else {
                    dishElement.eq(index).addClass('hover-selected');
                    SelectDish(dishElement[index]);
                }
            } else {
                SelectDish(dishElement[lastClickDish]);
            }
        }
        
        // Xử lý mouseenter cho dish items với throttle
        $('.recipelist-dishes > li').on('mouseenter', throttle(function(e) {
            if ($(this).hasClass('lowpoint') || isScrolling) return;
            
            isHovering = true;
            
            // Lấy data-index trực tiếp từ phần tử hiện tại
            const dishId = $(this).attr('data-index');
            
            // Lấy vị trí tương đối trong danh sách hiện tại
            const index = $(this).index();
            
            if (!isNaN(index) && index >= 0) {
                // Truyền cả phần tử vào để đảm bảo chọn đúng món ăn
                if (currentHoverIndex === -1) {
                    showDishInfo(index, this);
                } else {
                    requestAnimationFrame(() => showDishInfo(index, this));
                }
            }
        }, 50));
        
        // Xử lý mouseleave cho dish items
        $('.recipelist-dishes > li').on('mouseleave', function(e) {
            if (isScrolling) return;
            
            isHovering = false;
            
            // Sử dụng setTimeout để tránh việc flickering khi di chuyển giữa các items
            setTimeout(() => {
                if (!isHovering) {
                    currentHoverIndex = -1;
                    dishElement.removeClass('hover-selected');
                    dishElement.eq(lastClickDish).addClass('selected');
                    SelectDish(dishElement[lastClickDish]);
                }
            }, 50); // Chờ 50ms để kiểm tra xem có hover vào item khác không
        });
        
        // Xử lý tương tự cho các phần tử con bên trong icon-container
        $('.recipelist-dishes > li .icon-container > *').on('mouseenter', throttle(function(e) {
            if (isScrolling) return;
            
            const parentLi = $(this).closest('li');
            if (parentLi.hasClass('lowpoint')) return;
            
            isHovering = true;
            
            // Lấy index của phần tử cha
            const index = parentLi.index();
            
            if (!isNaN(index) && index >= 0) {
                requestAnimationFrame(() => showDishInfo(index, parentLi[0]));
            }
        }, 50));
        
        // Không cần mouseleave cho icon-container vì nó đã được xử lý bởi mouseleave của li
    }

    // Thiết lập click events riêng biệt
    function setupClickEvents() {
        // Hủy tất cả click event handlers cũ để tránh trùng lặp
        $('.recipelist-dishes > li, .recipelist-dishes > li .icon-container > *').off('click');
        
        // Thiết lập lại click events
        $('.recipelist-dishes > li, .recipelist-dishes > li .icon-container > *').on('click', function(e) {
            // Ngăn chặn sự kiện nổi bọt không cần thiết
            e.stopPropagation();
            
            // Nếu đang scroll, bỏ qua sự kiện click
            if (isScrolling) return;
            
            // Tìm phần tử li, có thể là chính nó hoặc phần tử cha
            let element = null;
            if ($(this).is('li')) {
                element = this;
            } else {
                element = $(this).closest('li')[0];
            }
            
            if (!element) return;
            
            // Nếu phần tử bị ẩn, bỏ qua
            if ($(element).hasClass('lowpoint')) return;
            
            // Lấy index trong danh sách hiện tại
            const index = $(element).index();
            
            // Xử lý chọn món ăn
            if (index >= 0) {
                // Bỏ selected khỏi tất cả các món ăn
                dishElement.removeClass('selected');
                // Thêm selected vào món ăn hiện tại
                $(element).addClass('selected');
                
                // Cập nhật món ăn hiện tại và hiển thị thông tin
                SelectDish(element);
                
                // Cập nhật các biến theo dõi
                lastHighLight = lastClickDish = index;
                currentHoverIndex = index;
            }
        });
    }

    // Biến cache để lưu thông tin món ăn đã hiển thị
    let dishInfoCache = {};
    let lastSelectedDish = null;
    
    // Tối ưu hiệu năng hàm SelectDish thêm
    function SelectDish(dish_elem) {
        // Lấy data-index từ phần tử được truyền vào
        const dishId = $(dish_elem).attr('data-index');
        
        // Nếu đây là món ăn đã chọn gần đây nhất, không cần cập nhật lại UI
        if (lastSelectedDish === dishId && !$(dish_elem).hasClass('hover-selected')) return;
        
        // Nếu đang scroll, chỉ cập nhật biến mà không thay đổi UI
        if (isScrolling) {
            lastSelectedDish = dishId;
            return;
        }
        
        // Cập nhật món ăn đã chọn gần đây nhất
        lastSelectedDish = dishId;
        
        // Unselect other dishes - chỉ trong trường hợp click chứ không phải hover
        if (!$(dish_elem).hasClass('hover-selected')) {
            $(".recipelist-dishes li.dish.selected").removeClass("selected");
            // Select this dish
            $(dish_elem).addClass("selected");
            
            // Cập nhật lastClickDish cho việc hover sau này
            dishElement.each(function(index) {
                if ($(this).attr('data-index') === dishId) {
                    lastClickDish = lastHighLight = index;
                    return false; // break the loop
                }
            });
        }
        
        // Sử dụng requestAnimationFrame để tối ưu hiệu suất render
        requestAnimationFrame(() => {
            // Set these classes to the corresponding icon on the details panel
            var icon_classes = $(dish_elem).attr("class");
            $(".recipedetails .dish").attr("class", icon_classes);
            
            // Set the dish number
            var index = parseInt(dishId);
            $(".recipedetails .dish-number").text(DishNumber(index));
            
            // Set the dish icon
            var img = $(dish_elem).find(".dish-icon").attr("style");
            $(".recipedetails .dish-icon").attr("style", img);
            
            // Get dish data
            var dish_data = discovered_dishes[index];
            if (dish_data) {
                // This dish has been discovered!
                $(".recipedetails").removeClass("unknown");
                let name = dish_data.name;
                if (typeof loc_string == 'function') name = loc_string("dish" + index);
                $(".recipedetails .dish-name").text(name);
                
                // Cập nhật chi tiết món ăn
                updateDishDetails(index, dish_data);
            } else {
                // Unknown dish
                $(".recipedetails").addClass("unknown");
                $(".recipedetails .dish-name").text("Unknown");
                
                // Reset icon-container khi không có dữ liệu
                resetIconContainer();
            }
        });
    }
    
    // Hàm để reset icon-container khi không có dữ liệu
    function resetIconContainer() {
        $(".recipedetails .dish .tribute-icon").attr("class", "tribute-icon").removeAttr("title").removeAttr("i18n-title");
        $(".recipedetails .dish .plating-tribute-icon").attr("class", "plating-tribute-icon").removeAttr("title").removeAttr("i18n-title");
        $(".recipedetails .dish .cooking-station-icon").empty();
    }
    
    // Hàm riêng để cập nhật thông tin chi tiết món ăn
    function updateDishDetails(index, dish_data) {
        // Reset tribute icon trước khi cập nhật
        $(".recipedetails .dish .tribute-icon").attr("class", "tribute-icon").removeAttr("title").removeAttr("i18n-title");
        
        var empty = true;
        
        // Ưu tiên theo thứ tự Diamond (3) -> Gold (2) -> Silver (1) -> Copper (0)
        let highestCoinIndex = -1;
        
        // Tìm coin có giá trị cao nhất để hiển thị trong icon
        for (var coin_index = 3; coin_index >= 0; coin_index--) {
            if (dish_data.coins && dish_data.coins[coin_index] > 0) {
                if (highestCoinIndex === -1) {
                    highestCoinIndex = coin_index;
                }
                
                // Hiển thị coin trong danh sách giá trị
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1)).addClass("visible");
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1) + " .value").text(dish_data.coins[coin_index]);
                empty = false;
            } else {
                $(".recipedetails .dish-tribute .coin" + (coin_index + 1)).removeClass("visible");
            }
        }
        
        // Cập nhật icon dựa trên coin cao nhất
        if (highestCoinIndex !== -1) {
            $(".recipedetails .dish .tribute-icon").addClass("coin" + (highestCoinIndex + 1) + " visible");
            let title = coin_names[highestCoinIndex];
            if (typeof loc_string == 'function') title = loc_string("coin" + (highestCoinIndex + 1));
            $(".recipedetails .dish .tribute-icon").attr("title", title);
            $(".recipedetails .dish .tribute-icon").attr("i18n-title", "coin" + (highestCoinIndex + 1));
        }
        
        // Hiển thị "None" hoặc "Unknown" nếu không có coin
        $(".recipedetails .dish-tribute .empty").text((index == 70) ? "None" : "Unknown");
        if (empty) {
            $(".recipedetails .dish-tribute .empty").show();
        } else {
            $(".recipedetails .dish-tribute .empty").hide();
        }
        
        // Tương tự cho silver coins
        updateSilverCoins(index, dish_data);
        
        // Cập nhật cravings
        updateCravings(index, dish_data);
        
        // Cập nhật cooking stations
        updateCookingStations(index, dish_data);
        
        // Cập nhật recipe
        updateRecipes(index, dish_data);
    }
    
    // Tách nhỏ các hàm cập nhật để dễ quản lý
    function updateSilverCoins(index, dish_data) {
        // Reset plating tribute icon trước khi cập nhật
        $(".recipedetails .dish .plating-tribute-icon").attr("class", "plating-tribute-icon").removeAttr("title").removeAttr("i18n-title");
        
        var empty = true;
        
        // Ưu tiên theo thứ tự Diamond (3) -> Gold (2) -> Silver (1) -> Copper (0)
        let highestCoinIndex = -1;
        
        // Tìm silver coin có giá trị cao nhất để hiển thị trong icon
        for (var coin_index = 3; coin_index >= 0; coin_index--) {
            if (dish_data.silver_coins && dish_data.silver_coins[coin_index] > 0) {
                if (highestCoinIndex === -1) {
                    highestCoinIndex = coin_index;
                }
                
                // Hiển thị silver coin trong danh sách giá trị
                $(".recipedetails .dish-plate .coin" + (coin_index + 1)).addClass("visible");
                $(".recipedetails .dish-plate .coin" + (coin_index + 1) + " .value").text(dish_data.silver_coins[coin_index]);
                empty = false;
            } else {
                $(".recipedetails .dish-plate .coin" + (coin_index + 1)).removeClass("visible");
            }
        }
        
        // Cập nhật icon dựa trên silver coin cao nhất
        if (highestCoinIndex !== -1) {
            $(".recipedetails .dish .plating-tribute-icon").addClass("coin" + (highestCoinIndex + 1) + " visible");
            let title = coin_names[highestCoinIndex];
            if (typeof loc_string == 'function') title = loc_string("coin" + (highestCoinIndex + 1));
            $(".recipedetails .dish .plating-tribute-icon").attr("title", title);
            $(".recipedetails .dish .plating-tribute-icon").attr("i18n-title", "coin" + (highestCoinIndex + 1));
        }
        
        $(".recipedetails .dish-plate .empty").text((index == 70) ? "None" : "Unknown");
        if (empty) {
            $(".recipedetails .dish-plate .empty").show();
        } else {
            $(".recipedetails .dish-plate .empty").hide();
        }
    }
    
    function updateCravings(index, dish_data) {
        if (dish_data.cravings) {
            var cravings = "";
            for (var craving_index = 0; craving_index < dish_data.cravings.length; craving_index++) {
                var craving = dish_data.cravings[craving_index];
                let name = craving_names[craving];
                if (typeof loc_string == 'function') name = loc_string(craving);
                cravings += name;
                if (craving_index < dish_data.cravings.length - 1) {
                    cravings += ", ";
                }
            }
            $(".recipedetails .dish-craving .value").text(cravings);
        } else {
            $(".recipedetails .dish-craving .value").text("None");
        }
    }
    
    function updateCookingStations(index, dish_data) {
        // Reset cooking-station-icon
        $(".recipedetails .dish .cooking-station-icon").empty();
        
        if (dish_data.station && dish_data.station.length > 0) {
            var stations = "";
            for (var station_index = 0; station_index < dish_data.station.length; station_index++) {
                var station = dish_data.station[station_index];
                let name = cooking_station_names[station];
                if (typeof loc_string == 'function') name = loc_string(station);
                stations += name;
                if (station_index < dish_data.station.length - 1) {
                    stations += ", ";
                }
                
                // Chỉ hiển thị icon của station đầu tiên
                if (station_index === 0) {
                    // Tạo phần tử span mới cho cooking station
                    let stationSpan = document.createElement("span");
                    $(stationSpan).addClass(station);
                    $(stationSpan).attr("title", name);
                    $(stationSpan).attr("i18n-title", station);
                    
                    // Thêm vào cooking-station-icon
                    $(".recipedetails .dish .cooking-station-icon").append(stationSpan);
                }
            }
            $(".recipedetails .dish-station .value").text(stations);
        } else {
            $(".recipedetails .dish-station .value").text("Unknown");
        }
    }
    
    function updateRecipes(index, dish_data) {
        // Cập nhật top recipes
        var recipes = $(".recipedetails .dish-recipes .dish-attribute-content");
        recipes.empty();
        
        if (dish_data.ingredients) {
            for (var recipe_index = 0; recipe_index < dish_data.ingredients.length; recipe_index++) {
                var recipe = dish_data.ingredients[recipe_index];
                var recipe_div = document.createElement("div");
                $(recipe_div).addClass("dish-recipe");
                $(recipe_div).append("<span class='rank-pos'>" + OrdinalNumber(recipe_index + 1) + "</span>");
                
                for (var ingredient_index = 0; ingredient_index < recipe.length; ingredient_index++) {
                    var ingredient = recipe[ingredient_index];
                    var ingredient_elem = document.createElement("span");
                    $(ingredient_elem).addClass("ingredient " + ingredient);
                    
                    let title = ingredient_names[ingredient] || ingredient;
                    if (typeof loc_string == 'function' && ingredient_names[ingredient]) {
                        title = loc_string(ingredient);
        }
                    
                    $(ingredient_elem).attr("title", title);
                    $(ingredient_elem).attr("i18n-title", ingredient);
                    $(ingredient_elem).appendTo($(recipe_div));
                }
                
                $(recipe_div).appendTo(recipes);
            }
        }
    }

    // Thiết lập hover events và click events ban đầu
    setupHoverEvents();
    setupClickEvents();
    
    // Mặc định chọn món ăn đầu tiên
    if (dishElement.length > 0) {
        dishElement[lastClickDish].click();
    }

    // Tối ưu hiệu năng sortAndHighlight
    function sortAndHighlight() {
        // Khi đang scroll, hoãn việc sort và highlight
        if (isScrolling) {
    setTimeout(() => {
                if (!isScrolling) sortAndHighlight();
            }, 200);
            return;
        }
        
        // Thêm class để báo hiệu rằng đang tiến hành thay đổi lớn
        $(document.body).addClass('updating-dom');
        
        // Chạy các thao tác nặng trong requestAnimationFrame để tránh blocking main thread
        requestAnimationFrame(() => {
            sortDishes();
            highlight();
            setupHoverEvents();
            setupClickEvents();
            
            // Sau khi hoàn thành, bỏ class
            requestAnimationFrame(() => {
                $(document.body).removeClass('updating-dom');
            });
        });
    }

    // Tối ưu hàm highlight để giảm reflow
    function highlight() {
        // Tạo DocumentFragment để thực hiện tất cả thay đổi trước khi áp dụng vào DOM
        const fragment = document.createDocumentFragment();
        const dishesToUpdate = [];
        
        for (let id = 1; id <= 70; ++id) {
            let dish = $(".recipelist-dishes .dish[data-index=" + id + "]");
            
            let currentStationAll = !currentStationStatus.pot &&
                !currentStationStatus.oven && !currentStationStatus.grill;
            
            let currentOfferingAll = !currentOfferingStatus.copper &&
                !currentOfferingStatus.silver && !currentOfferingStatus.gold && !currentOfferingStatus.diamond;
            
            let currentSilverOfferingAll = !currentSilverOfferingStatus.copper &&
                !currentSilverOfferingStatus.silver && !currentSilverOfferingStatus.gold && !currentSilverOfferingStatus.diamond;

            // Check offering filter (coins) - AND logic
            let offeringMatch = currentOfferingAll;
            if (!currentOfferingAll && discovered_dishes[id] && discovered_dishes[id].coins) {
                offeringMatch = true;
                let coins = discovered_dishes[id].coins;
                if (currentOfferingStatus.copper && coins[0] <= 0) offeringMatch = false;
                if (currentOfferingStatus.silver && coins[1] <= 0) offeringMatch = false;
                if (currentOfferingStatus.gold && coins[2] <= 0) offeringMatch = false;
                if (currentOfferingStatus.diamond && coins[3] <= 0) offeringMatch = false;
            }

            // Check silver offering filter (silver_coins) - AND logic
            let silverOfferingMatch = currentSilverOfferingAll;
            if (!currentSilverOfferingAll && discovered_dishes[id] && discovered_dishes[id].silver_coins) {
                silverOfferingMatch = true;
                let silverCoins = discovered_dishes[id].silver_coins;
                if (currentSilverOfferingStatus.copper && silverCoins[0] <= 0) silverOfferingMatch = false;
                if (currentSilverOfferingStatus.silver && silverCoins[1] <= 0) silverOfferingMatch = false;
                if (currentSilverOfferingStatus.gold && silverCoins[2] <= 0) silverOfferingMatch = false;
                if (currentSilverOfferingStatus.diamond && silverCoins[3] <= 0) silverOfferingMatch = false;
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

            // Thay vì thêm/xóa class ngay lập tức, lưu lại các thay đổi cần thực hiện
            dishesToUpdate.push({
                element: dish,
                needHighlight: needHighlight
            });
        }
        
        // Thực hiện tất cả thay đổi trong một lần để giảm reflow
        requestAnimationFrame(() => {
            dishesToUpdate.forEach(({ element, needHighlight }) => {
                if (dishDisplayModeDefault) {
                    if (needHighlight)
                        element.removeClass('lowpoint').removeClass('translucent');
                    else element.addClass('lowpoint').addClass('translucent');
                } else {
                    if (needHighlight)
                        element.removeClass('lowpoint').removeClass('invisible');
                    else element.addClass('lowpoint').addClass('invisible');
                }
            });
        });
    }

    // Function to sort dishes by selected criteria
    function sortDishes() {
        let dishList = $('.recipelist-dishes');
        let dishes = dishList.children('li').toArray();
        
        console.log('Sorting dishes, currentSortOrder:', currentSortOrder);
        console.log('Found dishes count:', dishes.length);
        
        // Lưu thông tin món ăn đang được chọn
        let selectedDishId = null;
        if (lastClickDish >= 0 && lastClickDish < dishElement.length) {
            selectedDishId = $(dishElement[lastClickDish]).attr('data-index');
        }
        
        dishes.sort((a, b) => {
            let dishIdA = parseInt($(a).attr('data-index'));
            let dishIdB = parseInt($(b).attr('data-index'));
            
            // Default sort by dish number (ascending)
            if (currentSortOrder === 'dish_number') {
                return dishIdA - dishIdB;
            }
            
            // Sort by offering coins
            if (currentSortOrder.startsWith('offering_')) {
                let coinIndex = 0;
                if (currentSortOrder === 'offering_copper') coinIndex = 0;
                else if (currentSortOrder === 'offering_silver') coinIndex = 1;
                else if (currentSortOrder === 'offering_gold') coinIndex = 2;
                else if (currentSortOrder === 'offering_diamond') coinIndex = 3;
                
                let coinsA = discovered_dishes[dishIdA] ? discovered_dishes[dishIdA].coins : [0, 0, 0, 0];
                let coinsB = discovered_dishes[dishIdB] ? discovered_dishes[dishIdB].coins : [0, 0, 0, 0];
                
                let primaryValueA = coinsA[coinIndex] || 0;
                let primaryValueB = coinsB[coinIndex] || 0;
                
                // Primary sort by selected coin type (highest to lowest)
                if (primaryValueA !== primaryValueB) {
                    return primaryValueB - primaryValueA;
                }
                
                // Secondary sort by priority: Diamond(3) → Gold(2) → Silver(1) → Copper(0)
                const priorityOrder = [3, 2, 1, 0];
                for (let i = 0; i < priorityOrder.length; i++) {
                    let index = priorityOrder[i];
                    if (index === coinIndex) continue; // Skip primary coin already compared
                    
                    let valueA = coinsA[index] || 0;
                    let valueB = coinsB[index] || 0;
                    
                    if (valueA !== valueB) {
                        return valueB - valueA; // Higher value first
                    }
                }
                
                // If all coins are equal, fallback to dish number
                return dishIdA - dishIdB;
            }
            
            // Sort by silver dish offering coins
            if (currentSortOrder.startsWith('silver_offering_')) {
                let coinIndex = 0;
                if (currentSortOrder === 'silver_offering_copper') coinIndex = 0;
                else if (currentSortOrder === 'silver_offering_silver') coinIndex = 1;
                else if (currentSortOrder === 'silver_offering_gold') coinIndex = 2;
                else if (currentSortOrder === 'silver_offering_diamond') coinIndex = 3;
                
                let silverCoinsA = discovered_dishes[dishIdA] ? discovered_dishes[dishIdA].silver_coins : [0, 0, 0, 0];
                let silverCoinsB = discovered_dishes[dishIdB] ? discovered_dishes[dishIdB].silver_coins : [0, 0, 0, 0];
                
                let primaryValueA = silverCoinsA[coinIndex] || 0;
                let primaryValueB = silverCoinsB[coinIndex] || 0;
                
                // Primary sort by selected coin type (highest to lowest)
                if (primaryValueA !== primaryValueB) {
                    return primaryValueB - primaryValueA;
                }
                
                // Secondary sort by priority: Diamond(3) → Gold(2) → Silver(1) → Copper(0)
                const priorityOrder = [3, 2, 1, 0];
                for (let i = 0; i < priorityOrder.length; i++) {
                    let index = priorityOrder[i];
                    if (index === coinIndex) continue; // Skip primary coin already compared
                    
                    let valueA = silverCoinsA[index] || 0;
                    let valueB = silverCoinsB[index] || 0;
                    
                    if (valueA !== valueB) {
                        return valueB - valueA; // Higher value first
                    }
                }
                
                // If all silver coins are equal, fallback to dish number
                return dishIdA - dishIdB;
            }
            
            // Fallback to dish number
            return dishIdA - dishIdB;
        });
        
        // Xóa hết các phần tử hiện tại
        dishList.empty();
        
        // Re-append sorted dishes
        dishes.forEach(dish => dishList.append(dish));
        
        // Cập nhật tham chiếu dishElement
        dishElement = $('.recipelist-dishes > li');
        
        // Tìm vị trí mới của món ăn đã chọn
        if (selectedDishId) {
            let newSelectedIndex = -1;
            
            // Duyệt qua dishElement để tìm món ăn đã chọn trước đó
            dishElement.each(function(index) {
                if ($(this).attr('data-index') === selectedDishId) {
                    newSelectedIndex = index;
                    return false; // break the loop
                }
            });
            
            // Nếu tìm thấy, cập nhật lastClickDish và lastHighLight
            if (newSelectedIndex >= 0) {
                lastClickDish = lastHighLight = newSelectedIndex;
                
                // Đảm bảo món ăn đã chọn vẫn hiển thị đúng
                dishElement.removeClass('selected');
                dishElement.eq(newSelectedIndex).addClass('selected');
                SelectDish(dishElement[newSelectedIndex]);
            } else {
                // Nếu không tìm thấy, chọn món ăn đầu tiên
                lastClickDish = lastHighLight = 0;
                dishElement.eq(0).addClass('selected');
                SelectDish(dishElement[0]);
            }
        }
    }

    // Hàm tiện ích
    function DishNumber(number) {
        if (number == 70) return "**";
        return (number < 10) ? "0" + number : number;
    }

    function OrdinalNumber(number) {
        return number + "<span class='ordinal'>" + OrdinalSuffix(number) + "</span>"
    }

    function OrdinalSuffix(number) {
        var ordinal = "";
        var last_digit = number.toString().slice(-1);
        switch (last_digit) {
            case '1':
                ordinal = 'st';
                break;
            case '2':
                ordinal = 'nd';
                break;
            case '3':
                ordinal = 'rd';
                break;
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                ordinal = 'th';
                break;
        }
        return ordinal;
    }

    // Thêm virtual scrolling để cải thiện hiệu năng
    function setupVirtualScrolling() {
        const recipeList = $('.recipelist-dishes');
        const container = recipeList.parent();
        
        // Chỉ thực hiện nếu có nhiều item
        if (dishElement.length > 30) {
            $(window).on('scroll', throttle(() => {
                if (!isScrolling) return;
                
                // Tính toán các phần tử hiển thị dựa trên vị trí scroll
                const containerTop = container.offset().top;
                const containerBottom = containerTop + container.height();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                // Chỉ thực hiện nếu container nằm trong viewport
                if (!(containerBottom < viewportTop || containerTop > viewportBottom)) {
                    dishElement.each(function() {
                        const $this = $(this);
                        const itemTop = $this.offset().top;
                        const itemBottom = itemTop + $this.height();
                        
                        // Chỉ hiển thị các phần tử trong viewport và vùng lân cận
                        const buffer = 200; // Buffer zone
                        if (itemBottom + buffer < viewportTop || itemTop - buffer > viewportBottom) {
                            $this.addClass('outside-viewport');
            } else {
                            $this.removeClass('outside-viewport');
                        }
                    });
                }
            }, 100));
        }
    }
    
    // Thiết lập virtual scrolling khi trang được tải
    $(document).ready(() => {
        setupVirtualScrolling();
        
        // Thêm window resize handler để cập nhật virtual scrolling
        $(window).on('resize', throttle(() => {
            setupVirtualScrolling();
        }, 200));
    });

    // Initial sort on page load (with slight delay to ensure DOM is ready)
    setTimeout(() => {
        sortAndHighlight();
    }, 100);
}
