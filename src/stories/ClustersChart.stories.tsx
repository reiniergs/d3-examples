import { ComponentMeta, ComponentStory } from '@storybook/react'
import ClusterChart from '../components/ClustersBarChart'
import { data } from '../components/ClustersBarChart/data'

const Default: ComponentMeta<typeof ClusterChart> = {
  title: 'Library/ClustersBarChart',
  component: ClusterChart,
  argTypes: {
  }
}

export default Default

const Template: ComponentStory<typeof ClusterChart> = (args) => <ClusterChart {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data,
  percentiles: [
    { name: 'Lower Earners', color: 'rgba(163, 168, 169, 0.9)' },
    { name: 'Mid Lower Earners', color: 'rgba(159, 208, 151, 0.4)' },
    { name: 'Middle Earners', color: 'rgba(159, 208, 151, 0.6)' },
    { name: 'Mid High Earners', color: 'rgba(159, 208, 151, 0.9)' },
    { name: 'High Earners', color: 'rgba(141, 194, 132, 1)' }
  ]
}
