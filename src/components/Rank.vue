<script setup>
import { reactive, onMounted } from 'vue';
import { getNovel } from "../api";

const props = defineProps({
    msg: {
        type: Object,
        default: {
            category: '',
            rank_type: ''
        }
    }
});

const book = reactive([]);
const iconList = ['/icon/1.png','/icon/2.png','/icon/3.png','/icon/4.png','/icon/5.png','/icon/6.png','/icon/7.png','/icon/9.png','/icon/10.png','/icon/10.png'];
const getOrdering = (r, param) => {
    if (r=='rcommend') {
        param.ordering = '-rcom_tk_num';
    } else if (r=='monthly') {
        param.ordering = '-mon_tk_num';
    } else if (r=='collect') {
        param.ordering = '-col_num';
    } else if (r=='comment') {
        param.ordering = '-com_num';
    } else {
        param.ordering = 'joined_time';
    } 
}

const init = () => {
    const param = {
        novel_category: props.msg.category,
        ordering: ''
    };

    getOrdering(props.msg.rank_type, param);
    getNovel(param)
    .then(res => {
        for(var i=0;i<9;i++) {
          const obj = {
              id: res.results[i].id,
              name: res.results[i].novel_name,
              cover: res.results[i].cover,
              author: res.results[i].novel_author.writer_name,
              col_num: res.results[i].col_num,
              com_num: res.results[i].com_num,
              mon_tk_num: res.results[i].mon_tk_num,
              rcom_tk_num: res.results[i].rcom_tk_num,
          };
          book.push(obj); 
        }        
        // console.log(book)
    })
    .catch(err => console.log(err))
}

const arraySpanMethod = ({ rowIndex, columnIndex }) => {
    if (rowIndex === 0) {
        if (columnIndex === 0) {
            return [1, 3]
        } else {
            return [0, 0]
        }

    }
}

const cellStyle = ({rowIndex, columnIndex}) => {
    let stylejson={}
    if (columnIndex === 2) {
        stylejson.color = 'rgb(179,179,179)'
        return {'color':'rgb(179,179,179)','font-size':'12px'}
    }
    return ""
}

onMounted(() => {
    init()
});
</script>

<template>
  <div>
    <el-table 
      :show-header="false" 
      :data="book" 
      :span-method="arraySpanMethod"
      :cell-style="cellStyle" 
      style="width: auto; height: 490px;"
    >
        <el-table-column type="index" align="center" >
            <template #default="scope">
              <span v-if="scope.$index == 0" >
                <el-row justify="space-between">
                    <el-col :span="14">
                        <ul class="ul-info" >
                            <li style="top: 0px; "><img style="height: 20px; width: auto;" :src="iconList[scope.$index]" /></li>
                            <li style="top: 25%; font-size: medium;"><a>{{ scope.row.name }}</a></li>
                            <li style="top: 50%; color: rgb(191,44,36); font-size: medium;">
                              <a v-if="msg.rank_type == 'rcommend'">{{ scope.row.rcom_tk_num }}推荐</a>
                              <a v-else-if="msg.rank_type == 'monthly'">{{ scope.row.mon_tk_num }}月票</a>
                              <a v-else-if="msg.rank_type == 'collect'">{{ scope.row.col_num }}收藏</a>
                              <a v-else-if="msg.rank_type == 'comment'">{{ scope.row.com_num }}讨论</a>
                              <a v-else > - </a>
                            </li>
                            <li style="top: 75%; color: rgb(179,179,179); font-size: small;"><a>{{ scope.row.author }}</a></li>
                        </ul>
                    </el-col>
                    <el-col :span="10">
                        <img style="height: 100px;width: auto;" :src="book[0].cover" />
                    </el-col>
                </el-row>
              </span>
              <span v-else ><img style="height: 20px;width: auto;" :src="iconList[scope.$index]" /></span>
            </template>
        </el-table-column>
        <el-table-column prop="name" :show-overflow-tooltip="true"/>
        <el-table-column v-if="msg.rank_type == 'rcommend'" prop="rcom_tk_num" width="55px" :show-overflow-tooltip="true" />
        <el-table-column v-else-if="msg.rank_type == 'monthly'" prop="rcom_tk_num" width="55px" :show-overflow-tooltip="true" />
        <el-table-column v-else-if="msg.rank_type == 'collect'" prop="rcom_tk_num" width="55px" :show-overflow-tooltip="true" />
        <el-table-column v-else-if="msg.rank_type == 'comment'" prop="rcom_tk_num" width="55px" :show-overflow-tooltip="true" />
        <el-table-column v-else width="55px" :show-overflow-tooltip="true" > - </el-table-column>

    </el-table>
  </div>
</template>

<style lang='scss' scoped>
.ul-info {
    padding: 0;
    list-style-type: none;
}
.ul-info li {
    position: absolute;
    left: 0;
}
.ul-info li:nth-child(2) {
    width: 115px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>