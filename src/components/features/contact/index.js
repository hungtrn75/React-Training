import React, { PureComponent } from "react";
import { API_URL } from "../../../config";
import Contact from "./ContactItem";

export default class ContactList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      per: 8,
      page: 1,
      totalPages: null,
      scrolling: false
    };
  }

  componentWillMount() {
    this.loadContacts();
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  handleScroll = e => {
    const { scrolling, totalPages, page } = this.state;
    if (scrolling) return;
    if (totalPages <= page) return;
    const lastItem = document.querySelector("ul.contacts > li:last-child");
    const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 3 * lastItem.clientHeight;
    if (pageOffset > lastItemOffset - bottomOffset) {
      this.loadMore();
    }
  };

  loadContacts = () => {
    const { per, page, contacts } = this.state;
    fetch(`${API_URL}?per=${per}&page=${page}`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          contacts: [...contacts, ...json.contacts],
          scrolling: false,
          totalPages: json.total_pages
        })
      );
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadContacts
    );
  };
  render() {
    return (
      <ul className="contacts">
        {this.state.contacts.map((contact, index) => (
          <li key={index}>
            <Contact {...contact} />
          </li>
        ))}
      </ul>
    );
  }
}
