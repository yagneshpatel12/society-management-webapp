class UserDto{
    familyName;
    email;
    phoneNo;
    houseNo;
    members;
    advertises;
    totalMember;
    proffession;
    proffessionDiscription;
    profileImg;

    constructor (user){
        this.familyName = user.familyName;
        this.email = user.email;
        this.phoneNo = user.phoneNo;
        this.houseNo = user.houseNo;
        this.members=user.members;
        this.advertises = user.advertises.reverse();
        this.totalMembers = user.totalMembers;
        this.proffession = user.proffession;
        this.profileImg=user.profileImg;
        this.proffessionDiscription = user.proffessionDiscription;
    }
}
module.exports = UserDto;