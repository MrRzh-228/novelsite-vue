import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNovelStore = defineStore('NovelStore', {
    // 定义state
    state: () => {
      return { 
        category: {name: '', path: ''},
        book: {id:'', name: '', path: ''},
        author: {name: '', path: ''},
        chapterList: []
      }
    },
    // 定义action
    actions: {
        updateCategoryName(categoryName, path) {
            this.category.name = categoryName
            this.category.path = path
        },
        updateBookName(id, bookName, path) {
            this.book.id = id
            this.book.name = bookName
            this.book.path = path
        },
        updateAuthor(authorName, path) {
            this.author.name = authorName
            this.author.path = path
        },
        updateChapter(list) {
            this.chapterList = list
        }
    },
    // 定义getters

    // 开启数据缓存
    persist: {
        enabled: true
    }
});

// export const useNovelStore = defineStore('NovelStore', () => {
//     const category = ref('');
//     const book = ref('');
//     const author = ref('');

//     function updateCategoryName(categoryName) {
//         category.value = categoryName;
//     }
//     function updateBookName(bookName) {
//         book.value = bookName;
//     }
//     function updateAuthor(authorName) {
//         author.value = authorName;
//     }
//     return { book, category, author, updateCategoryName, updateBookName, updateAuthor };
// });
  