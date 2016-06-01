import unittest
from api.navori.navori import Navori


class NavoriTest(unittest.TestCase):
 
    def test_NavoriLogin(self):
        navori = Navori()
        login = navori.CheckLoginSDK("damian.manoff","damian.manoff")
        print login
        self.assertEqual(4, result)