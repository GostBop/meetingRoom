<template>
  <div class="searchBar">
    <el-row :gutter="30" style="margin-top:2%">
      <el-form v-model="query">
        <el-col :span="4" :offset="2">
          <el-form-item label="会议名称">
            <el-input v-model="query.topic"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期选项">
            <el-date-picker
              v-model="query.meeting_time"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11" style="margin-top:3.6%">
          <el-button type="primary" class="el-icon-search" @click="getTableData()">查询</el-button>
        </el-col>
      </el-form>
    </el-row>
    <hr style="border:1px solid #e9e9e9;">
    <el-row style="margin-top:2%;">
      <el-col :span="22" :offset="1">
        <el-table ref="multipleTable" border tooltip-effect="dark" :data="tableData" >
          <el-table-column max-width="10%" prop="meeting_time" label="会议时间" align="center"></el-table-column>
          <el-table-column max-width="30%" prop="topic" label="主题" align="center"></el-table-column>
          <el-table-column max-width="5%" prop="master" label="主持人" align="center"></el-table-column>
          <el-table-column prop="participant" label="参与人" align="center"></el-table-column>
        </el-table>
      </el-col>

      <el-col style="margin-top:1%;">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="this.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>

    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import mockdata from '@/util/tabledata.js'
  export default {
    data() {
      return {
        tableData: null,
        query: {
          topic: '',
          meeting_time: '',
        },

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

//                tableData: [],
        pageSize: 5,
        currentPage: 1,
        total: 1,


      };
    },

    mounted: function () {
      this.getTableData();
    },

    methods: {
      getTableData() {
        let _this = this;
        
        axios.post('http://localhost:3000/getTableData', {
          
          data: _this.query,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        }).then(function (response) {
          var data = response.data;
          _this.tableData = data.meetings;
          _this.total = data.total;

        }).catch(function (error) {
          console.log(error)
        })
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableData();
      }
    },

  }


</script>

<style>
  .searchBar {
    margin-top: 10px;
    /*padding-left: 20px;*/
    /*margin-left: 10px ;*/
    background-color: white;
    height: 30%;
  }
</style>
