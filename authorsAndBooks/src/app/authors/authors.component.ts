import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from "@angular/router";

export interface PeriodicElement {
  _id: string;
  title: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {_id: '123', title: 'Hydrogen'},
];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit {
  authorName: any;
  // displayedColumns: string[] = ['_id', 'title'];
  displayedColumns: string[] = ['_id', 'title'];
  dataSource = ELEMENT_DATA;
  constructor(private apollo: Apollo, public router: Router,) { }

  ngOnInit(): void {
    this.loadAuthors()
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
    this.dataSource = data.authors
    console.log(this.dataSource)
  }

  addAuthor = async () => {
    console.log('authorName', this.authorName)
    const query = gql`mutation{
      createAuthor(author:{title: ${JSON.stringify(this.authorName)}}){
        title,
        createdAt
      }
    }`
    const data = await this.addData(query)
    this.authorName = ''

  }


  getRecord(element) {
    this.router.navigate(['/books'], { queryParams: {authorId: element._id}})
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
