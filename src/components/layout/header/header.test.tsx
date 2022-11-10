import { render, screen } from '@testing-library/react'
import Header from './header'

describe('Header', () => {
  it('should render sign in link when user is not authorized', () => {
    render(<Header />)
    const signInLink = screen.getByText('Sign In')
    expect(signInLink).toBeVisible()
  })

  it('should render new listing link if user is authorized', () => {
    render(<Header />)
    const newListing = screen.getByText('New Listing')
    expect(newListing).toBeVisible()
  })
})
