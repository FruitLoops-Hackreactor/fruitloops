describe('Review', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should render a review', () => {
    const wrapper = shallow(<Review />)
    expect(wrapper.exists()).toBe(true)
  }
}