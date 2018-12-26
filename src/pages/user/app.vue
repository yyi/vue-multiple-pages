<template>
    <div>
        <div class="border-bottom white-bg page-heading">
            <el-form :inline="true">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="登录名：">
                            <el-input
                                    placeholder="请输入登录名"
                                    v-model="loginName"
                                    clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="alignRight">
                        <el-form-item label="姓名：">
                            <el-input
                                    placeholder="请输入用户姓名"
                                    v-model="userName"
                                    clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary" @click="addModalShow=true">新增</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <el-table :data="getTableData()" border stripe class="table-width">
                <el-table-column
                        fixed
                        prop="loginName"
                        label="登录名"
                        min-width="15%">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        min-width="15%">
                </el-table-column>
                <el-table-column
                        prop="organizations.name"
                        label="部门"
                        min-width="25%">
                </el-table-column>
                <el-table-column
                        prop="roles.Name"
                        label="角色"
                        min-width="25%">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        min-width="20%">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="新增用户" width="30%" :visible.sync="addModalShow" :close-on-click-modal="false">

            <el-form>
                <el-form-item label="登录名：">
                    <el-input
                            placeholder="请输入登录名"
                            v-model="addLoginName"
                            clearable></el-input>
                </el-form-item>

                <el-form-item label="密码：">
                    <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="addUserPassword"
                            clearable></el-input>
                </el-form-item>

                <el-form-item label="确认密码：">
                    <el-input
                            type="password"
                            placeholder="请输入确认密码"
                            v-model="addUserConfirmPassword"
                            clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input
                            placeholder="请输入用户姓名"
                            v-model="addUserName"
                            clearable></el-input>
                </el-form-item>


                <el-form-item label="部门：">
                    <el-input
                            placeholder="请选择部门"
                            v-model="addUserDept"
                            :readonly="true">
                        <template slot="append">
                            <el-button size="small">选择</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-input
                            placeholder="请选择角色"
                            v-model="addUserRoles"
                            :readonly="true">
                        <template slot="append">
                            <el-button size="small" @click="roleSelectModalShow=!roleSelectModalShow">选择</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>

            <RoleSelect :is-show="roleSelectModalShow"></RoleSelect>


            <div slot="footer" class="dialog-footer">
                <el-button @click="addModalShow = false">取 消</el-button>
                <el-button type="primary" @click="addModalShow = false">保存</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import $ from '../../libs/util'
import RoleSelect from '../componet/role/RoleSelect'

export default {
  components: { RoleSelect },
  data() {
    return {
      userData: [],
      loginName: '',
      userName: '',
      addModalShow: false,
      updateModalShow: false,
      updatePasswordModalShow: false,
      roleSelectModalShow: false,
      addLoginName: '',
      addUserPassword: '',
      addUserConfirmPassword: '',
      addUserName: '',
      addUserDept: '',
      addUserRoles: ''
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    getTableData() {
      return this.userData.map(user => {
        let transUser = {}
        Object.assign(transUser, user)
        transUser.roles.Name = user.roles.map(role => role.name).join(',')
        transUser.organizations.name = user.organizations
          .map(organization => organization.name)
          .join(',')
        return transUser
      })
    },
    getUserList() {
      $.get(this, '/rest/user/list', res => (this.userData = res['content']))
    }
  },
  mounted() {
    console.log('mounted')
    this.getUserList()
  }
}
</script>

<style scoped>
</style>
