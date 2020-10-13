import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export interface PeriodicElement {
  _id: string;
  title: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {_id: '123', title: 'Hydrogen'},
];


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {
  title: any;
  body: any;
  authorIds: any
  // displayedColumns: string[] = ['_id', 'title'];
  displayedColumns: string[] = ['_id', 'title', 'body'];
  dataSource = ELEMENT_DATA;
  authors: []
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.loadBooks()
    this.loadAuthors()
  }

  loadBooks = async() => {
    const query = gql`query {
      books {
        title,
        body,
        authorIds,
        _id
      }
    }`
    const data =  await this.loadData(query)
    this.dataSource = data.books
    console.log(this.dataSource)
  }

  loadAuthors = async() => {
    console.log('works')
    const query = gql`query {
      authors {
        title,
        _id
      }
    }`
    const data =  await this.loadData(query)
    this.authors = data.authors
  }

  addBook = async () => {
    const query = gql`mutation{
      createBook(book:{title: ${JSON.stringify(this.title)}, body: ${JSON.stringify(this.body)}, authorIds: [${JSON.stringify(this.authorIds)}]}){
        title,
        body,
        authorIds,
        createdAt
      }
    }`
    const data = await this.addData(query)
    this.title = '';
    this.body = '';
    this.authorIds = '';

  }
  loadData = (query): any => {
    return new Promise((resolve, reject) => {
      this.apollo.query({
        query: query
      }).subscribe(result => {
        resolve(result.data)
      },err => {
        reject(err)
      })
    })
  }

  addData = (query): any => {
    return new Promise((resolve, reject) => {
      this.apollo.mutate({
        mutation: query
      }).subscribe(result => {
        resolve(result.data)
      },err => {
        reject(err)
      })
    })
  }

}
