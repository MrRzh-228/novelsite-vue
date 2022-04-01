<script setup>
import { ref, onMounted  } from 'vue';
import { getNovel } from "../api";

const props = defineProps({
    category: {
        type: Number,
        default: ''
    }
});

const book = ref([]);

const init = () => {
    const param = {
        novel_category: props.category,
        ordering: '-update_time'
    }
    getNovel(param)
    .then(res => {
        book.value=res.results;
        tiemDiff(book);
        console.log(book)
    })
    .catch(err => console.log(err))
};

const tiemDiff = (book) => {
    for (var i=0;i<book.value.length;i++) {
        let date = new Date();
        let date1 = new Date(book.value[i].update_time)
        let minute = (date.getTime() - date1.getTime()) / 1000 / 60;
        if (parseInt(minute) === 0) {
            book.value[i].update_time = '刚刚';
        } else if (60 > parseInt(minute) > 0) {
            book.value[i].update_time =  parseInt(minute) + '分钟前';
        } else if (24 > parseInt(minute / 60) >= 1) {
            book.value[i].update_time = parseInt(minute / 60) + '小时' + (parseInt(minute - parseInt(minute / 60) * 60) === 0 ? "" : parseInt(minute - parseInt(minute / 60) * 60) + '分钟') + "前";
        } else {
            book.value[i].update_time = parseInt(minute / 60 / 24) + '天' + (parseInt(minute / 60) - parseInt(minute / 60 / 24) * 24) + '小时' + parseInt(minute - parseInt(minute / 60) * 60) + '分钟前'
        }
    }
}

onMounted(() => {
    init()
});

</script>

<template>
  <!-- <span style="text-align: center">最近更新</span> -->
  <div class="table-wrapper">
    <el-table :data="book" style="width: 100%">
        <el-table-column prop="novel_name" label="最近更新" />
        <el-table-column prop="update_time" label="上次更新" />
    </el-table>
  </div>
</template>

<style lang='scss' scoped>
.table-wrapper {
   height: 80%;;
   margin-top: 10px;
   ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
     background-color:  rgb(247,246,242);
     color: rgb(237,66,89);
   }
}
.table-wrapper ::v-deep .el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.table-wrapper ::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.table-wrapper ::v-deep .el-table tr {
  background-color: transparent !important;
}
.table-wrapper ::v-deep .el-table th {
  background-color: rgb(247,246,242);
  border-bottom: 1px solid  #e6e6e6;
  color: rgb(102,102,102);
}
.table-wrapper ::v-deep .el-table td, .el-table th.is-leaf {
    border-bottom: 2px solid  #e6e6e6;
    background-color: rgb(247,246,242);
    color: rgb(102,102,102);
}
</style>
    