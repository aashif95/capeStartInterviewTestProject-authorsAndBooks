import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';

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
  minPrice: number = 0;
  maxPrice: number;
  // displayedColumns: string[] = ['_id', 'title'];
  displayedColumns: string[] = ['_id', 'title', 'body', 'price'];
  dataSource = ELEMENT_DATA;
  authors: []
  price: any;
  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBooks()
    this.route.queryParams.subscribe((params: any) => {
      if (params.authorId) {
        const authId  = JSON.stringify(params.authorId)
        this.loadBooks(authId)
      } else {
        this.loadBooks()
      }
    });
    this.loadAuthors()
  }

  loadBooks = async(authorId?) => {
    let query = gql`query {
      books {
        title,
        body,
        price,
        authorIds,
        _id
      }
    }`;

    if (authorId) {
      query = gql`query {
        booksByAuthorIds (authorId:${authorId}) {
          title,
          body,
          price,
          authorIds,
          _id
        }
      }`
    }
    const data =  await this.loadData(query)
    if(authorId) {

      this.dataSource = data.booksByAuthorIds;
    } else {
      this.dataSource = data.books;
    }
  }

  filter = async () => {
    let queryObj = `(min: ${this.minPrice}, max: ${this.maxPrice})`;
    if (this.minPrice && !this.maxPrice) {
      queryObj = `(min: ${this.minPrice})`;
    }
    if (!this.minPrice && this.maxPrice) {
      queryObj = `(max: ${this.maxPrice})`;
    }

    if (!this.minPrice && !this.maxPrice) {
      return
    }
    const query = gql`query {
      booksByPriceRange ${queryObj} {
        title,
        body,
        price,
        authorIds,
        _id
      }
    }`;
    const data =  await this.loadData(query)
    this.dataSource = data.booksByPriceRange;
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
      createBook(book:{title: ${JSON.stringify(this.title)}, body: ${JSON.stringify(this.body)},  price: ${JSON.stringify(this.price)}, authorIds: [${JSON.stringify(this.authorIds)}]}){
        title,
        body,
        price,
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
