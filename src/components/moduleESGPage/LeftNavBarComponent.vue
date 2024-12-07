<script lang="ts">
import { PropType } from 'vue';
import { getGroupIssues } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';

interface GroupIssue {
  name: string;
}

interface Issue {
  _id: number;
  name: string;
  group_id: number;
}

export default {
  name: 'LeftNavBarComponent',
  data() {
    return {
      groupIssues: [] as GroupIssue[],
      issue : [] as Issue[],
    };
  },

  methods: {
    async loadIssues() {
      try {
        const groupIssuesResponse = await getGroupIssues();
        const issuesResponse = await getIssues();

        const groupIssuesData: GroupIssue[] = groupIssuesResponse as GroupIssue[];
        const issuesData: Issue[] = issuesResponse as Issue[];
        this.groupIssues = groupIssuesData;
        this.issue = issuesData;
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    },
  },


mounted() {
  this.loadIssues();
},
};
</script>

<template>
  <div>
    <ul>
      
      <li v-for="(groupItem, index) in groupIssues" :key="index">
        <strong>{{ groupItem.name }}</strong> 

        <ul>
          <li v-for="(issue, idx) in issue.filter(issue => issue.group_id === (groupIssues.indexOf(groupItem) + 1))" :key="idx">
            {{ issue.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>



<style scoped>
.grayed-out {
  color: #bbb;
  pointer-events: none; 
}
</style>