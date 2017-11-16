$(function() {
    
    showHistoryData();

    var  searchInput = $('.search-box input');
    $('#search-btn').on('tap',function() {
        var keyWord = searchInput.val();
        setHistoryData(keyWord);
        // 获取搜索结果页面
        location.href = './searchList.html?proName='+keyWord;
        // 重新载入页面
        showHistoryData();
    })

    // 点击清空历史记录
    $('#clear-history').on('tap',function(){
        localStorage.removeItem('ltHistory')
    })

    // 点击删除按钮
    $('.search-history-list').on('tap','i',function() {
        var deleteData = $(this).siblings('span').html();
        removeHistoryData(deleteData);
        showHistoryData();
    })

    // 点击历史列表中的字,把这个字放到地址栏中国
    $('.search-history-list').on('tap','span',function() {
        var keyWord = $(this).html();
        location.herf = './searchList.html?proName='+keyWord;
    })

})

// 获取当前localStorage的值

var getHistoryData = function() {
    return  JSON.parse(window.localStorage.getItem('ltHistory') || '[]');
}



// 设置搜索记录

var setHistoryData = function (value) {
    var  list = getHistoryData();

    $.each(list,function(i,item) {
        if(value == item) {
            list.splice(i,1);
        }
    });
    list.push(value);

    localStorage.setItem('ltHistory',JSON.stringify(list));
}



// 移除历史记录

var removeHistoryData = function (value) {
    var  list = getHistoryData();
    $.each(list,function(i,item) {
        if(value == item) {
            list.splice(i,1);
        }
    })
    localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 显示历史记录

var  showHistoryData = function () {
    var list = getHistoryData();
    if(list.length == 0 ) {
       $('.empty-history').show();
       $('.search-history').hide();
    }else {
        var historyList = template('historyTemplate',{
            list:list
        })

        $('.search-history-list').html(historyList);
        $('.search-history').show();
        $('empty-history').hide();
    }
}


