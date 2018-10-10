import React, { Component } from "react";
import { API_URL } from "../../config";
import { Pagination, Spin } from "antd";
import ContactItem from "../features/contact/ContactItem";

export default class AppPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      per: 8,
      page: 1,
      totalPages: null,
      loading: true
    };
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    const { per, page } = this.state;
    fetch(`${API_URL}?per=${per}&page=${page}`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          contacts: [...json.contacts],
          loading: false,
          totalPages: json.total_pages
        })
      );
  };

  onChange = (page, pageSize) => {
    this.setState(
      {
        page,
        loading: true
      },
      this.loadContacts
    );
  };

  onShowSizeChange = (current, size) => {
    this.setState(
      {
        page: current ? current : 1,
        per: size
      },
      this.loadContacts
    );
  };

  render() {
    const { per, totalPages, contacts, page, loading } = this.state;

    return (
      <div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px 30px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <ul className="contacts">
            {contacts.map((contact, index) => (
              <li key={index}>
                <ContactItem {...contact} />
              </li>
            ))}
          </ul>
        )}

        <Pagination
          total={per * totalPages}
          pageSize={per}
          current={page}
          defaultCurrent={1}
          onChange={this.onChange}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    );
  }
}
