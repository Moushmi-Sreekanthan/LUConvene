const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
var mailer = require('nodemailer');
const e = require('express');

//update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

//get a user
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  //const username = req.body.username;
  console.log('user===', req);

  try {
    const user = (await User.findById(userId))
      ? await User.findById(userId)
      : await User.findOne({ username: user.username });
    console.log('user===', user);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

//search user

router.post('/search', async (req, res) => {
  try {
    const user = await User.find({
      username: new RegExp(req.body.search, 'i'),
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/forgetPassword', async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      let password = Math.floor(100000 + Math.random() * 900000);
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
      const user = await User.findByIdAndUpdate(user._id, {
        $set: req.body,
      });
      var smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'rupal26.r@gmail.com', 
          pass: 'yourpassword',
        },
      });

      var mail = {
        from: 'Company Name OR Portal Name <youremail@gmail.com>', 
        to: email,
        subject: 'Password change request',
        text: '',
        html: `<b>Your new password is  : ${password}</b>`,
      };

      smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
      });
      res.status(200).json('Your new password has been sent to your mail');
    } else {
      return res.status(403).json('Invalid Email address');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
