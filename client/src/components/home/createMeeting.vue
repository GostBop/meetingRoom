<template>
  <el-row :gutter="55" class="create_form">
    <el-form :model="create" :rules="createRules" ref="create" label-width="90px">
      <el-col :span="10" :offset="1">
        <el-form-item label="会议主题" prop="topic">
          <el-input v-model="create.topic"></el-input>
        </el-form-item>

        <!-- openParticipant 在data中 -->
        <el-form-item label="参与人员" prop="participant">
          <!--<el-button type="primary" @click="participantVisible = true">选择</el-button>-->
            <el-select v-model="yewubu" multiple placeholder="业务部">
              <el-option
                v-for="item in dept[0].children"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="guanlibu" multiple placeholder="管理部">
              <el-option
                v-for="item in dept[1].children"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="gongchengbu" multiple placeholder="工程部">
              <el-option
                v-for="item in dept[2].children"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="shengchanbu" multiple placeholder="生产部">
              <el-option
                v-for="item in dept[3].children"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>

        <!-- 参与人员选择框 -->
       <!-- <el-dialog title="参与人员选择" :visible.sync="participantVisible" id="dialog">
          <el-row :gutter='20'>

            <el-col :span="10">
              <el-tree
                :data="dept"
                :props="deptProps"
                highlight-current
                :indent='25'
              >
              </el-tree>
            </el-col>

            <el-col :span='18'>
              <el-transfer
                v-model="create.participant"
                :data="transferData"
                :titles="['可选人员']"
                :indent='25'
              >
              </el-transfer>
            </el-col>

          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" :plain="true" @click="participantVisible = false">取 消</el-button>
            <el-button type="primary" @click="participantVisible = true">确 定</el-button>
          </div>
        </el-dialog>-->


        <el-form-item label="会议日期" prop="date">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            :picker-options="datePickerOption">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="会议时间" prop="time"> 
          <el-time-select
            v-model="time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '22:30'
                                }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="commit(create)">提交</el-button>
          <!--<el-button :plain='true' type="danger" @click="clear">清空</el-button>-->
        </el-form-item>
      </el-col>
    </el-form>

  </el-row>

</template>

<script>

  import  store from '../../vuex/store'

  export default {
    data() {
      return {
        // form数据
        create: {
          topic: '',
          master: '',
          participant: [],
          meeting_time: ''
        },
        yewubu: [],
        gongchengbu: [],
        shengchanbu: [],
        guanlibu: [],

        createRules: {
          topic: [
            {required: true, message: "请输入会议主题", trigger: 'blur',}
          ],
          participant: [
            {required: true, message: "请选择参与人员", trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择会议日期', trigger: 'blur'}
          ],
          time: [
            {required: true, message: '请选择会议时间', trigger: 'blur'}
          ],
        },

        time: '',
        date: '',

        //参与人员选择 dialog
        participantVisible: false,
        dept: [{},{},{},{}],
        deptProps: {
          id: 'id',
          children: 'children',
          label: 'name',
        },

        transferData: [],

        datePickerOption: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        datetimeIsChange: false,
        durationIsChange: false,
      }
    },

    computed: {
      datetime: function () {
        this.durationIsChange = true;
        var d = new Date(this.date);
        //转换时间格式 2000-00-00 00:00:00
        var month = d.getMonth() + 1
        if(month < 10) {
          month = '0' + month
        }
        var res = d.getFullYear() + '-' + month + '-' + d.getDate() + ' ' + this.time;

        return res;
      }
    },

    methods: {
      getDept() {
        let _this = this;
        if (_this.dept) {
          axios.get('http://localhost:3000/getDept')
            .then(function (response) {
              var data = response.data;
              _this.dept = data;
            }).catch(function (error) {
            console.log(error);
          })
        }
      },
      /*getUser() {
        let _this = this;
        for(let j = 0; j < _this.dept.length; j++) {
          axios.post('http://localhost:3000/getUsers', _this.dept[j])
            .then(function (response) {
              const data = response.data.users;
              for (let i = 0; i < data.length; i++) {
                _this.dept[j].children.push({
                  id: i,
                  name: data[i].username,
                });
              }

            }).catch(function (error) {
            console.log(error);
          });
        }
        this.dept = _this.dept
      },
      getUsers(data) {
        //能正确获取人员，但只在部门下显示对应已被选择人员

        console.log(this.create.participant);

        let _this = this;
        axios.post('http://localhost:3000/getUsers', data)
          .then(function (response) {
            const data = response.data.users;
            const transferData = [];
            for (let i = 0; i < data.length; i++) {
              transferData.push({
                key: i,
                label: data[i].username,
              });
            }

            _this.transferData = transferData;

          }).catch(function (error) {
          console.log(error);
        });
      },*/

      commit(create) {
        let _this = this;
        for(var i in _this.yewubu) {
          create.participant.push(_this.yewubu[i])
        }
        for(var i in _this.guanlibu) {
          create.participant.push(_this.guanlibu[i])
        }
        for(var i in _this.shengchanbu) {
          create.participant.push(_this.shengchanbu[i])
        }
        for(var i in _this.gongchengbu) {
          create.participant.push(_this.gongchengbu[i])
        }
        create.meeting_time = _this.datetime
        create.master = _this.$store.getters.user
        axios.post('http://localhost:3000/createMeeting',
          {
            data: create 
          }
        ).then(function (response) {

          var data = response.data;
          if (data.isSuccess) {
            _this.$message({
              'type': 'success',
              'message': '添加成功~',
            });
          } else {
            _this.$message.error('添加失败!');

          }
          
          create.participant = []

        }).catch(function (error) {
          console.log(error);
        })

      },

    },

    mounted: function () {
      this.getDept();
    },


  }

</script>

<style>
  .create_form {
    margin-top: 3%;
  }

  .el-dialog {
    text-align: left;
  }
</style>
