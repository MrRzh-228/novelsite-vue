<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { createBook } from "../api";

const { proxy } = getCurrentInstance();

const props = defineProps({
    msg: {
        type: Array,
        default: []
    }
});

const isShowCard = ref('manage')

const imageUrl = ref('')

const ruleForm = ref()
const ruleFormObj = {
  novel_name: '',
  intro: '',
  novel_category: 9
}
const ruleFormData = ref({ruleFormObj})

const header = {"Content-Type": "multipart/form-data"}
const coverList = reactive([])
const fd = new FormData()

const rules = ref({
  novel_name: [
    { required: true, message: '请输入作品名称', trigger: 'blur' },
    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
  ],
  intro: [
    { required: true, message: '请输入作品简介', trigger: 'blur' },
    { min: 6, max: 200, message: '长度在 6 到 200 个字符', trigger: 'blur' }
  ],
  novel_category: [
    { required: true, message: '请选择作品类别', trigger: 'blur' }
  ]
})


const handleCoverChange = (file, fileList) => {
  coverList.values = fileList
  
  if (file.raw) {
    console.log(file)
    imageUrl.value = URL.createObjectURL(file.raw)
    console.log(imageUrl.value)
  }
  
  // console.log(file)
  // console.log(fileList)
}

const beforeCoverUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('封面图片必须为.JPG格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('封面图片必须小于于500kb！')
    return false
  }
  return true
}

const handleCoverExceed = () => {
  ElMessage.error('只能上传一张封面图！')
}

const httpRequest = (param) => {
  const fileObj = param.file
  fd.append('cover', fileObj)
  // console.log("封面图" + fd.get('cover'));
}

const submitForm = () => {
  ruleForm.value.validate((valid) => {
    if(valid) {
      if (coverList.length <= 0) {
        ElMessage.error('请上传封面图！')
        return
      }
      proxy.$refs.upload.submit()
      fd.append('novel_name', ruleFormData.value.novel_name)
      fd.append('novel_category', ruleFormData.value.novel_category)
      fd.append('intro', ruleFormData.value.intro)
      createBook(fd)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  })
}

</script>

<template>
  <div style="margin: 0 20px 0 20px;">
    <el-card :body-style="{ padding: '20px' }" v-if="isShowCard=='manage'" style="min-height: 730px;margin-bottom: 30px;">
        <el-row justify="space-between">
          <el-col :span="4">
            <h4>我的作品</h4>
          </el-col>
          <el-col :span="3">
            <el-button type="text" @click="isShowCard='create'" style="padding-top: 0;">新建作品</el-button>
          </el-col>
        </el-row>
        <el-divider style="margin-top: 3px;" />
        <div v-for="book in msg">
          <el-row>
            <el-col :span="4">
              <router-link :to="`/info/${bookid}`">
                <el-image alt="" :src=book.cover style="width: 115px; height: 144px;"/>
              </router-link>
            </el-col>
            <el-col :span="8">
              <div class="book-info">
                <h3>{{ book.name }}</h3>
                <p>无最新章节</p>
                <p style="position: absolute; bottom: 0px;">收藏 {{ book.col_num }}</p>
              </div>
            </el-col>
            <el-col :span="6" :offset="5">
              <div style="position: absolute; bottom: 0px;">
                <el-button>作品管理</el-button>
                <el-button type="primary">去写作</el-button>
              </div>
            </el-col>
          </el-row>
          <el-divider />
        </div>
    </el-card >

    <el-card :body-style="{ padding: '20px' }" v-if="isShowCard=='create'" style="min-height: 730px;margin-bottom: 30px;">
      <el-row justify="space-between">
          <el-col :span="4">
            <h4>创建作品</h4>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="isShowCard='manage'" style="padding-top: 0;">返回</el-button>
          </el-col>
        </el-row>
      <el-divider style="margin-top: 3px;" />
      <el-form :model="ruleFormData" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="作品封面：" >
          <el-upload
            class="cover-uploader"
            action="http://127.0.0.1:8000/api/novel/novel/"
            ref="upload"
            :headers="header"
            :http-request="httpRequest"
            :before-upload="beforeCoverUpload"
            :on-change="handleCoverChange"

            :on-exceed="handleCoverExceed"
            :limit="1"
            :auto-upload="false"
            :data="ruleForm"
            :file-list="coverList"
          >
            <img v-if="imageUrl" :src="imageUrl" class="cover" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
            <template #tip>
              <div class="el-upload__tip">
                图片大小应小于500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="作品名：" prop="novel_name">
          <el-input v-model="ruleFormData.novel_name" />
        </el-form-item>
        <el-form-item label="作品类型：" prop="novel_category">
          <el-select v-model="ruleFormData.novel_category" placeholder="请选择">
            <el-option label="科幻" value="9" />
            <el-option label="网游" value="10" />
            <el-option label="穿越" value="11" />
            <el-option label="都市" value="12" />
            <el-option label="玄幻" value="13" />
            <el-option label="修真" value="14" />
          </el-select>
        </el-form-item>
        <el-form-item label="作品简介：" prop="intro">
          <el-input v-model="ruleFormData.intro" type="textarea" />
        </el-form-item>
        <el-form-item  >
          <el-button type="primary" @click="submitForm">创建作品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.book-info {
    height: 100%;
    h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }
    p {
        margin-top: 10px;
        font-size: 14px;
        color: rgba(21, 26, 48, 0.5);
    }
}
h4 {
    margin-top: 0;
}
.cover-uploader .cover {
  width: 114px;
  height: 152px;
  display: block;
}
</style>

<style>
.cover-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.cover-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 114px;
  height: 152px;
  text-align: center;
}
</style>