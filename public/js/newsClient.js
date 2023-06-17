const $newsId = document.querySelector('#newsId')
const $tablink = document.querySelector('#link2')


$tablink.addEventListener('click', (e) => {
    e.preventDefault()
      fetch('/newstoday').then((response) => {
        response.json().then((data) => {
            let desc = '<style type=text/css>tbody tr:nth-child(odd) {background:  	#d6d6c2;}table.gridtable {font-family: verdana,arial,sans-serif;color:black;border-width: .5px;border-color: #666666;border-collapse: collapse;width: 100%;background: #f5f5f5;box-shadow: inset 0 1px 0 #fff;font-size: 10px;line-height: 24px;margin: 30px auto;text-align: left;}table.gridtable th {border-width: .5px;padding: 1px;border-style: solid;border-color: #666666;background-color: #9F9F9F;background:linear-gradient(#777, #444);border-left: 1px solid #555;border-right: 1px solid #777;border-top: 1px solid #555;border-bottom: 1px solid #333;box-shadow: inset 0 1px 0 #999;color: #fff;}table.gridtable td {border-width: .5px;padding: 1px;border-style: solid;border-color: #666666;border-right: 1px solid #fff;border-left: 1px solid #e8e8e8;border-top: 1px solid #fff;border-bottom: 1px solid #e8e8e8;padding: 5px 5px;position: relative;transition: all 300ms;}table.gridtable.tr:last-of-type td {box-shadow: inset 0 -1px 0 #fff;}table.gridtable.ttr:last-of-type td:first-child {box-shadow: inset 1px -1px 0 #fff;}table.gridtable.ttr:last-of-type td:last-child {box-shadow: inset -1px -1px 0 #fff;}</style><table class=gridtable>'
            if (data.error) {
                return console.log(data.error);
            } else {
                data.forEach(e => {
                    desc = desc + '<tr><td>'+e.description+'</td></tr>'
                });
            }
            $newsId.innerHTML = desc+'</table>';
        })
    })
})