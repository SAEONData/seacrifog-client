import { useMutation } from '@apollo/react-hooks'

export default ({ mutation, children }) => {
  const [executeMutation] = useMutation(mutation)
  return children({ executeMutation })
}
