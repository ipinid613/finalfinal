$(document).ready(function () {
    getContents();
})

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60 + 540

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60 // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 24) {
        return parseInt(time) + "일 전"
    }
    return date.getFullYear() + '년', date.getMonth() + 1 + '월', date.getDate() + '일'
}


function getContents() {
    $.ajax({
        type: "GET",
        url: "/get",
        data: {},
        success: function (response) {
            let contents = response['all_contents']
            for (let i = 0; i < contents.length; i++) {
                let content = contents[i]
                let img = contents[i]['imgPath'];
                let comment = contents[i]['content']
                let time_post = new Date(content['uploadingTime']);
                let time_before = time2str(time_post);
                let id = content["_id"];

                let temp_html = `
                <div id="${content["_id"]}" class="contents">
                    <img class="img" src="${img}"/>
                    <div class="contents_">
                        <div class="nameTime">
                            <p class="time">${time_before}</p>
                            <p>@${content['nick']}</p>
                        </div>
                        <div class="Box">${comment}</div>
                        <div class="lastPlz">
                               <button type="button" onclick="edit('${id}')">수정</button>
                                <button type="button" onclick="delete_content('${id}')">삭제</button>
                            </div>
                   </div>
                </div>`

                $('#boxOfContents').prepend(temp_html);
            }
        }
    })
}

function edit(id) {
    $.ajax({
        type: "POST",
        url: "/a",
        data: {
            _id_give: id
        },
        success: function (response) {
            location.href = '/update'
        }

    })
}

function delete_content(id) {
    $.ajax({
        type: 'POST',
        url: '/delete',
        data: {_id_give: id},
        success: function (response) {
            alert('삭제되었습니다!');
            window.location.reload();
        }
    })
}
const logoutBtn = document.querySelector('.logout');
logoutBtn.addEventListener('click', () => {
    document.cookie = 'mytoken=; expires=Mon, 01 Jan 1970 00:00:00 UTC;'
    window.location.href = '/'
});



// // login
// const loginBtn = document.querySelector('.login');
// const signUpBtn = document.querySelector('.signUp');
// const writeBtn = document.querySelector('.write');
// const heart = document.querySelector('.emptyheart');
//
// function getCookie(cookieName) {
//     var cookieValue = null;
//     if (document.cookie) {
//         var array = document.cookie.split((escape(cookieName) + '='));
//         if (array.length >= 2) {
//             var arraySub = array[1].split(';');
//             cookieValue = unescape(arraySub[0]);
//         }
//     }
//     return cookieValue;
// }
//
// if (getCookie('mytoken')) {
//     logoutBtn.style.display = 'flex';
//     logoutBtn.style.justifyContent = 'center';
//     logoutBtn.style.alignItems = 'center';
//     writeBtn.style.display = 'flex';
//     writeBtn.style.justifyContent = 'center';
//     writeBtn.style.alignItems = 'center';
//     loginBtn.style.display = 'none';
//     signUpBtn.style.display = 'none';
// } else if (getCookie('mytoken') == '') {
//     loginBtn.style.display = 'flex';
//     signUpBtn.style.display = 'flex';
//     logoutBtn.style.display = 'none';
//     writeBtn.style.display = 'none';
// }

