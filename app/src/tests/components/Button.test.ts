import { render } from '@testing-library/vue'
import ButtonVue from '../../components/Utils/Button.vue'

test('it should work', () => {
    const { getByText } = render(ButtonVue, {
        props: {},
        slots: {
            default: 'My button',
        },
    })

    // assert output
    getByText('My button')
})
