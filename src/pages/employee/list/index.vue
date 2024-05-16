<template>
  <div class="employee">
    <div class="header">
      <t-form ref="form" layout="inline" label-width="40px">
        <t-form-item label="工号" name="employeeCode">
          <t-input v-model="queryParams.employeeCode" class="searchInput" placeholder="请输入工号" />
        </t-form-item>
        <t-form-item label="姓名" name="name">
          <t-input v-model="queryParams.name" class="searchInput" placeholder="请输入员工姓名" />
        </t-form-item>
        <t-form-item label="角色" name="roleId">
          <t-select v-model="queryParams.roleId" :options="roleTypeList" placeholder="请选择角色"></t-select>
        </t-form-item>
        <t-form-item label="状态" name="state">
          <t-select v-model="queryParams.state" :options="stateTypeList" placeholder="请选择状态"></t-select>
        </t-form-item>
      </t-form>
      <t-form-item>
        <t-space size="small">
          <t-button theme="success" variant="base" @click="getList(pagination)">搜索</t-button>
          <t-button theme="primary" @click="handleUpdateEmployee">新增</t-button>
        </t-space>
      </t-form-item>
    </div>
    <div class="table">
      <t-table
        row-key="index"
        :data="tableData"
        :pagination="pagination"
        :columns="columns"
        :hover="true"
        @change="onPageChange"
      >
        <template #gender="slotProps">
          <t-space>
            <span v-if="slotProps.row.gender === 1">男</span>
            <span v-if="slotProps.row.gender === 0">女</span>
          </t-space>
        </template>
        <template #state="slotProps">
          <t-space>
            <span v-if="slotProps.row.state === 1">在职</span>
            <span v-if="slotProps.row.state === 0">离职</span>
          </t-space>
        </template>
        <template #roleId="slotProps">
          <t-space>
            <span v-if="slotProps.row.roleId === 1">管理员</span>
            <span v-else-if="slotProps.row.roleId === 2">人事经理</span>
            <span v-else-if="slotProps.row.roleId === 3">财务经理</span>
          </t-space>
        </template>
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="handleUpdateEmployee(slotProps)">编辑</t-link>
            <t-link theme="danger" @click="handleDelEmployee(slotProps)"> 删除</t-link>
          </t-space>
        </template>
      </t-table>
    </div>
    <div class="dialog">
      <t-dialog
        v-model:visible="dialogVisible"
        :header="updateFormData.id ? '修改员工' : '新增员工'"
        :confirm-on-enter="true"
        :on-confirm="onSubmitFormData"
        :on-cancel="closeDialog"
      >
        <div class="dialog__content">
          <t-form ref="updateform" :data="updateFormData" :colon="true">
            <t-form-item v-show="updateFormData.id" label="工号" name="employeeCode">
              <t-input v-model="updateFormData.employeeCode" disabled></t-input>
            </t-form-item>
            <t-form-item label="姓名" name="name">
              <t-input v-model="updateFormData.name" placeholder="请输入姓名"></t-input>
            </t-form-item>
            <t-form-item label="手机" name="phone">
              <t-input v-model="updateFormData.phone" placeholder="请输入手机号"></t-input>
            </t-form-item>
            <t-form-item label="机构" name="roleId">
              <t-select v-model="updateFormData.dept" placeholder="请选择机构">
                <t-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
            <t-form-item label="角色" name="roleId">
              <t-select v-model="updateFormData.roleId" placeholder="请选择角色">
                <t-option v-for="item in roleTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
            <t-form-item label="性别" name="gender">
              <t-radio-group v-model="updateFormData.gender">
                <t-radio :value="1">男</t-radio>
                <t-radio :value="0">女</t-radio>
              </t-radio-group>
            </t-form-item>
            <t-form-item label="状态" name="state">
              <t-radio-group v-model="updateFormData.state">
                <t-radio :value="1">在职</t-radio>
                <t-radio :value="0">离职</t-radio>
              </t-radio-group>
            </t-form-item>
          </t-form>
        </div>
      </t-dialog>
      <t-dialog
        v-model:visible="delConfirmVisible"
        header="确认删除选择的员工？"
        :body="confirmBody"
        :on-cancel="onCancelDel"
        @confirm="onConfirmDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonProps, DialogProps, SelectProps, TableProps } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { DelEmployee, GetEmployeeList, UpdateEmployee } from '@/api/employee';

const roleTypeList: SelectProps['options'] = [
  { label: '管理员', value: 1 },
  { label: '人事经理', value: 2 },
  { label: '财务经理', value: 3 },
];
const stateTypeList = [
  { label: '在职', value: 1 },
  { label: '离职', value: 0 },
];
const deptList = [
  { label: '人事部', value: '001' },
  { label: '财务部', value: '002' },
  { label: '运营部', value: '003' },
  { label: '后勤部', value: '004' },
];

const columns = ref<TableProps['columns']>([
  { colKey: 'serial-number', width: 80, title: '序号' },
  { colKey: 'employeeCode', title: '工号' },
  { colKey: 'name', title: '姓名' },
  { colKey: 'gender', title: '性别', width: 60 },
  { colKey: 'phone', title: '手机', width: 140 },
  { colKey: 'dept', title: '机构' },
  { colKey: 'roleId', title: '角色' },
  { colKey: 'state', title: '状态' },
  { colKey: 'createTime', title: '创建时间' },
  { colKey: 'op', title: '操作' },
]);
let tableData: TableProps['data'] = [];
const queryParams = ref({
  employeeCode: '',
  state: '',
  name: '',
  roleId: null,
  page: {},
});
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1,
});
const onPageChange = (pageInfo: any) => {
  pagination.value = pageInfo;
  getList(pageInfo);
  console.log('onPageChange', pageInfo);
};
const getList = async (paginationInfo: any) => {
  const { current, pageSize } = paginationInfo;
  console.log('current', paginationInfo, current, pageSize);
  queryParams.value.page = {
    current,
    pageSize,
  };
  interface Response {
    code: number;
    message: string;
    data: object[];
    count: number;
    success: boolean;
  }
  const response: Response = await GetEmployeeList(queryParams.value);
  console.log('res', response);
  tableData = response.data;
  pagination.value.total = response.count;
};
onMounted(() => {
  getList(pagination.value);
});
const selesctEmployeeItem = ref([]);
const handleDelEmployee = (item: any) => {
  delConfirmVisible.value = true;
  const { id } = item.row;
  selesctEmployeeItem.value.push(id);
};
const confirmBody: string = '';
const dialogVisible = ref(false);
const updateFormData = ref({
  id: null,
  employeeCode: '',
  name: '',
  gender: 1,
  dept: '',
  phone: '',
  roleId: null,
  state: 1,
  createTime: '',
});
const handleUpdateEmployee: ButtonProps['onClick'] = (item: any) => {
  if (item && item.row) {
    console.log('row', item.row);
    updateFormData.value = item.row;
  }
  dialogVisible.value = true;
};
const onSubmitFormData = async () => {
  console.log('onSubmitFormData', onSubmitFormData);
  const res = await UpdateEmployee(updateFormData.value);
  console.log('res', res);
};
const closeDialog: DialogProps['onConfirm'] = () => {
  dialogVisible.value = false;
  updateFormData.value = {
    id: null,
    employeeCode: '',
    name: '',
    gender: 1,
    dept: '',
    phone: '',
    roleId: null,
    state: 1,
    createTime: '',
  };
};
// 删除
const delConfirmVisible = ref(false);
const onConfirmDelete = async () => {
  console.log('onConfirmDelete');
  const res = await DelEmployee(selesctEmployeeItem.value);
  console.log('res', res);
};
const onCancelDel = () => {
  console.log('onCancelDel');
};

//
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  .searchInput {
    width: 140px;
  }
}
</style>
