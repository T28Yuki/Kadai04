$(function() {
    // ページロード時にLocalStorageのデータを表示
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const category = value.substring(value.lastIndexOf('(') + 1, value.lastIndexOf(')')).replace(/-/g, ' ');
      
      const html = `
        <li>
          ${key} - ${value.replace(/\s*\(.*?\)\s*/g, '')}
          <button class="delete" data-key="${key}">✖</button>
        </li>
      `;
    
      const categoryBoxId = `category-${category}`;
      const categoryBox = $(`#${categoryBoxId} ul`);
      categoryBox.append(html);
    }
    
    // 削除ボタン クリックイベント
    $(document).on("click", ".delete", function() {
      // 削除対象のkeyを取得
      const key = $(this).data("key");
    
      // ローカルストレージから削除
      localStorage.removeItem(key);
    
      // 要素を削除
      $(this).parent().remove();
    });
    
    // Save クリックイベント
    $("#save").on("click", function() {
      // 入力された文字を取得
      const key = $("#key").val();
      const value = $("#dates").val();
      const category = $("#category").val(); // カテゴリを取得
    
      // テキストフィールドまたはカテゴリーが空欄の場合にアラートを表示
      if (key === '' || value === '' || category === '空欄') {
        alert("購入商品と日付、カテゴリーを入力してください。");
        return;
      }
    
      // ローカルストレージに保存する
      localStorage.setItem(key, `${value} (${category})`);
    
      // 表示するHTMLを作成
      const html = `
        <li>
          ${key} - ${value.replace(/\s*\(.*?\)\s*/g, '')}
          <button class="delete" data-key="${key}">✖</button>
        </li>
      `;
    
      const categoryBoxId = `category-${category}`;
      const categoryBox = $(`#${categoryBoxId} ul`);
      categoryBox.append(html);
    
      // 入力欄をクリア
      $("#key").val("");
      $("#dates").val("");
      $("#category").val("");
    });
  });
  

