const arr = new Array(30).fill(0).map(() => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `Name ${Math.random().toString(36).substr(2, 9)}`,
    age: Math.floor(Math.random() * 100),
    gender: Math.random() < 0.5 ? 'Male' : 'Female',
  }
})

export { arr }
