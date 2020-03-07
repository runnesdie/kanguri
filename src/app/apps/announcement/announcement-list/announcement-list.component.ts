import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-announcement-list',
    templateUrl: './announcement-list.component.html',
    styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    getArray() {
        const array = [];
        for (let i = 0; i < 10; i++) {
            array.push(i);
        }
        return array;
    }

}
