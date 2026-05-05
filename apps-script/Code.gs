// Sata Robo — Google Sheets Integration
// Sheet ID: 1sN0s_l71m9SrAm8hzdUmJEnsRM23FZuUJOFCbUSIAx0

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(
      '1sN0s_l71m9SrAm8hzdUmJEnsRM23FZuUJOFCbUSIAx0'
    );

    var sheet = ss.getSheets()[0];

    // Parse data từ request trước
    var data = JSON.parse(e.postData.contents);

    // Lấy dữ liệu câu hỏi SataMath
    var sataMath = data.satamath || data.sataMath || '';

    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian',
        'Họ và tên phụ huynh',
        'Điện thoại',
        'Email',
        'Khóa học quan tâm',
        'Cơ sở học',
        'Con đang học SataMath?'
      ]);

      sheet.getRange(1, 1, 1, 7)
        .setFontWeight('bold')
        .setBackground('#6B21A8')
        .setFontColor('#ffffff');
    } else {
      // Nếu sheet cũ đang thiếu cột SataMath thì tự thêm tên cột
      var lastColumn = sheet.getLastColumn();
      if (lastColumn < 7) {
        sheet.getRange(1, 7).setValue('Con đang học SataMath?');
        sheet.getRange(1, 1, 1, 7)
          .setFontWeight('bold')
          .setBackground('#6B21A8')
          .setFontColor('#ffffff');
      }
    }

    // Thêm row mới
    sheet.appendRow([
      new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
      }),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.course || '',
      data.center || '',
      sataMath || ''
    ]);

    // Gửi email thông báo sau khi đã có data
    MailApp.sendEmail({
      to: 'satarobo@gmail.com',
      subject: '[Sata Robo] Đăng ký mới: ' + (data.name || 'Không có tên'),
      body: [
        'Phụ huynh: ' + (data.name || ''),
        'Điện thoại: ' + (data.phone || ''),
        'Email: ' + (data.email || ''),
        'Khóa học: ' + (data.course || ''),
        'Cơ sở: ' + (data.center || ''),
        'Con đang học SataMath?: ' + (sataMath || ''),
        'Thời gian: ' + new Date().toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh'
        })
      ].join('\n')
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ok',
        message: 'Đăng ký thành công'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        msg: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
