<template>
  <div class="header">
    <t-form ref="form" layout="inline" label-width="40px">
      <t-form-item label="工号" name="empyeeId">
        <t-input class="searchInput" placeholder="请输入工号" />
      </t-form-item>
      <t-form-item label="姓名" name="name">
        <t-input class="searchInput" placeholder="请输入员工姓名" />
      </t-form-item>
      <t-form-item label="角色" name="roleId">
        <t-select :options="roleTypeList" placeholder="请选择角色"></t-select>
      </t-form-item>
      <t-form-item label="状态" name="state">
        <t-select :options="stateTypeList" placeholder="请选择状态"></t-select>
      </t-form-item>
    </t-form>
    <t-form-item>
      <t-space size="small">
        <t-button theme="success" variant="base" @click="getList">搜索</t-button>
        <t-button theme="primary" @click="updateEmployee">新增</t-button>
      </t-space>
    </t-form-item>
  </div>
  <div class="table">
    <t-base-table row-key="index" :data="data" :columns="columns" :hover="true">
      <template #op="slotProps">
        <t-space>
          <t-link theme="primary" @click="updateEmployee(slotProps)">编辑</t-link>
          <t-link theme="danger" @click="delEmployee(slotProps)"> 删除</t-link>
        </t-space>
      </template>
    </t-base-table>
  </div>
  <div class="dialog">
    <t-dialog
      v-model:visible="dialogVisible"
      :header="updateFormData.id ? '修改员工' : '新增员工'"
      :confirm-on-enter="true"
      :on-cancel="closeDialog"
    >
      <p>This is a dialog</p>
    </t-dialog>
    <t-dialog
      v-model:visible="delConfirmVisible"
      header="确认删除选择的员工？"
      :body="confirmBody"
      :on-cancel="onCancelDel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { getEmployeeList } from '@/api/employee';
// import { SelectProps } from 'tdesign-vue-next';

const roleTypeList = [
  { label: '管理员', value: '1' },
  { label: '人事经理', value: '2' },
  { label: '财务经理', value: '3' },
];
const stateTypeList = [
  { label: '全部', value: '' },
  { label: '在职', value: '1' },
  { label: '离职', value: '0' },
];
const columns = ref([
  { colKey: 'id', title: '员工id' },
  { colKey: 'empyeeId', title: '工号' },
  { colKey: 'name', title: '姓名' },
  { colKey: 'dept', title: '机构' },
  { colKey: 'roleId', title: '角色' },
  { colKey: 'state', title: '状态' },
  { colKey: 'createTime', title: '创建时间' },
  { colKey: 'op', title: '操作' },
]);

const data = ref([
  {
    id: '1',
    empyeeId: 'E1',
    name: 'Employee1',
    dept: 'HR',
    roleId: 'Role1',
    state: 'active',
    createTime: '2023-04-01T12:00:00Z',
  },
  {
    id: '2',
    empyeeId: 'E2',
    name: 'Employee2',
    dept: 'Engineering',
    roleId: 'Role3',
    state: 'inactive',
    createTime: '2023-04-01T12:00:00Z',
  },
  {
    id: '3',
    empyeeId: 'E3',
    name: 'Employee3',
    dept: 'Sales',
    roleId: 'Role2',
    state: 'pending',
    createTime: '2023-04-01T12:00:00Z',
  },
]);

const getList = async () => {
  const res = await getEmployeeList();
};
onMounted(() => {
  getList();
});
const delEmployee = (item) => {
  console.log('row', item.row);
};
const dialogVisible = ref(false);
const updateFormData = ref({
  id: '',
  empyeeId: '',
  name: '',
  dept: '',
  roleId: '',
  state: '',
  createTime: '',
});
const updateEmployee = (item) => {
  if (item && item.row) {
    console.log('row', item.row);
    updateFormData.value = item.row;
  }
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = false;
};
// 删除
const onConfirmDelete = () => {
  console.log('onConfirmDelete');
};
const onCancelDel = () => {
  console.log('onCancelDel');
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  .searchInput {
    width: 140px;
  }
}
</style>
