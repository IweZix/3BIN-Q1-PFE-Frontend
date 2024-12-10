<script lang="ts">
import { getGroupIssues } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';

interface GroupIssue {
  groupIssueName: string;
}

interface Issue {
  _id: number;
  issueName: string;
  group_name: string;
}

export default {
  name: 'LeftNavBarComponent',
  data() {
    return {
      groupIssues: [] as GroupIssue[],
      issue: [] as Issue[]
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
    }
  },

  mounted() {
    this.loadIssues();
  }
};
</script>

<template>
  <div>
    <ul>
      <li v-for="(groupItem, index) in groupIssues" :key="index">
        <strong>{{ groupItem.groupIssueName }}</strong>

        <ul>
          <li
            v-for="(issue, idx) in issue.filter(
              (issue) => issue.group_name === groupItem.groupIssueName
            )"
            :key="idx"
          >
            {{ issue.issueName }}
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
