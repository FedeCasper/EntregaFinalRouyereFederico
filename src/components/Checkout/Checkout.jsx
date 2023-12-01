import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const Checkout = () => {

  const colorTheme = useContext(ThemeContext)

  return (
    <section className={ `flex flex-col justify-center items-center gap-3 grow ${ colorTheme.theme === 'bg-slate-100' ? 'bg-slate-100' : 'bg-slate-700'}` }>
      <h2>Checkout</h2>
    </section>
  )
}

export default Checkout