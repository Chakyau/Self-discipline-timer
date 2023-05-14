$(document).ready(function () {
    var totalSeconds = localStorage.getItem('totalSeconds') || 0; // 从本地存储获取总时间
    var totalPopups = localStorage.getItem('totalPopups') || 0; // 从本地存储获取弹窗次数
    var countdown; // 倒计时
    var isCounting = false; // 是否正在计时
    var initialSeconds = 0; // 初始设定的总时间

    $("#start").click(function () {
        // 如果正在计时，停止计时
        if (isCounting) {
            clearInterval(countdown);
            $("#start").text("开始");
            isCounting = false;
            localStorage.setItem('totalSeconds', totalSeconds); // 存储总时间
            localStorage.setItem('totalPopups', totalPopups); // 存储弹窗次数
        } else {
            // 如果不在计时，开始计时
            var hours = parseInt($("#hours").val());
            var minutes = parseInt($("#minutes").val());
            var seconds = parseInt($("#seconds").val());

            // 将时间转换为秒
            totalSeconds = hours * 3600 + minutes * 60 + seconds;
            initialSeconds = totalSeconds;

            countdown = setInterval(function () {
                // 如果时间到，停止计时
                if (totalSeconds <= 0) {
                    clearInterval(countdown);
                    $("#start").text("开始");
                    isCounting = false;

                    // 记录本次设定的时间
                    var record = $("<li>").text(Math.floor(initialSeconds / 3600) + ":" + Math.floor((initialSeconds % 3600) / 60) + ":" + (initialSeconds % 60));
                    $("#record-list").append(record);

                    // 弹窗提示
                    if (initialSeconds >= 36000) {
                        alert("恭喜！累计自律十小时！");
                        totalPopups++;
                        $("#popup-count").text(totalPopups);
                        initialSeconds = 0;
                    }

                    alert("计时结束！");
                    localStorage.setItem('totalSeconds', totalSeconds); // 存储总时间
                    localStorage.setItem('totalPopups', totalPopups); // 存储弹窗次数
                } else {
                    totalSeconds--;
                    hours = Math.floor(totalSeconds / 3600);
                    minutes = Math.floor((totalSeconds - hours * 3600) / 60);
                    seconds = totalSeconds - hours * 3600 - minutes * 60;

                    $("#hours").val(hours);
                    $("#minutes").val(minutes);
                    $("#seconds").val(seconds);
                }
            }, 1000);

            $("#start").text("停止");
            isCounting = true;
        }
    });
});
